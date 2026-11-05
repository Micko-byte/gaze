'use client';

import { usePathname } from 'next/navigation';
import { furnContact } from '@/content/furnishings';

/* The Institute, Press and Her Gaze keep their own desks; this is the group's and Furnishings' sales line. */
const OWN_DESK = ['/institute', '/press', '/hergaze', '/furnishings/price-list'];

/**
 * A floating WhatsApp button, so anyone can skip the forms and talk to the team. It sits above the Shop pill, and clears
 * the buy bar on a piece's page.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname && OWN_DESK.some((p) => pathname.startsWith(p))) return null;
  const text = encodeURIComponent('Hello Gaze, I would like to speak with someone.');
  return (
    <a
      href={`https://wa.me/${furnContact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-cursor="hover"
      className="fixed bottom-[84px] right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#1F3A2E] text-[#F3EFE6] shadow-[0_8px_24px_-8px_rgba(6,18,42,0.6)] transition-transform duration-300 hover:scale-105 md:bottom-[100px] md:right-8 md:h-14 md:w-14"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.94-.2-.3a8.2 8.2 0 1 1 6.9 3.79Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.55.12-.17.25-.64.8-.78.96-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-2-1.23 7.4 7.4 0 0 1-1.37-1.71c-.15-.25-.02-.38.1-.5.12-.12.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    </a>
  );
}
