'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export function RouteCurtain({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        key="route-curtain"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-0 z-[9998] bg-obsidian flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 1.1] }}
          transition={{ duration: 1.0, times: [0, 0.25, 0.7, 1], ease: 'easeOut' }}
          className="text-rose text-3xl"
        >
          ▲
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
