'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, isSaveData } from '@/lib/motion';

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isSaveData()) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    // Probe that at least one video source actually exists before mounting the <video> tag
    fetch('/video/hero.mp4', { method: 'HEAD' })
      .then(r => { if (r.ok) setShowVideo(true); })
      .catch(() => {/* poster-only fallback */});
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const v = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.1 });
    observer.observe(v);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.62] saturate-[0.9]"
          autoPlay muted loop playsInline preload="metadata"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.62] saturate-[0.9]" />
      )}
    </div>
  );
}
