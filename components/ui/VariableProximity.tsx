'use client';

import { useEffect, useMemo, useRef, type HTMLAttributes, type MutableRefObject } from 'react';

type Props = HTMLAttributes<HTMLSpanElement> & {
  label: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
};

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

export default function VariableProximity({
  label,
  containerRef,
  radius = 80,
  className = '',
  style,
  ...restProps
}: Props) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const letters = useMemo(() => label.split(''), [label]);

  useEffect(() => {
    let frameId = 0;

    const loop = () => {
      if (!containerRef.current) {
        frameId = requestAnimationFrame(loop);
        return;
      }

      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x !== x || lastPositionRef.current.y !== y) {
        lastPositionRef.current = { x, y };
        const containerRect = containerRef.current.getBoundingClientRect();

        letterRefs.current.forEach(letterRef => {
          if (!letterRef) return;

          const rect = letterRef.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
          const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
          const distance = Math.sqrt(
            (mousePositionRef.current.x - letterCenterX) ** 2 +
              (mousePositionRef.current.y - letterCenterY) ** 2,
          );
          const influence = Math.max(0, 1 - distance / radius);
          const scale = 1 + influence * 0.12;
          const opacity = 0.65 + influence * 0.35;
          const blur = (1 - influence) * 0.4;

          letterRef.style.transform = `translateY(${(1 - influence) * 2}px) scale(${scale})`;
          letterRef.style.opacity = String(opacity);
          letterRef.style.filter = `blur(${blur}px)`;
        });
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [containerRef, mousePositionRef, radius]);

  return (
    <span
      className={className}
      style={{
        display: 'inline',
        ...style,
      }}
      {...restProps}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          ref={el => {
            letterRefs.current[i] = el;
          }}
          style={{
            display: 'inline-block',
            transition: 'transform 120ms linear, opacity 120ms linear, filter 120ms linear',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}
