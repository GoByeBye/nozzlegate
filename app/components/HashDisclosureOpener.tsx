"use client";

import { useEffect } from "react";

export function HashDisclosureOpener() {
  useEffect(() => {
    const openDisclosure = (rawId: string) => {
      if (!rawId) {
        return;
      }

      let id = rawId;

      try {
        id = decodeURIComponent(rawId);
      } catch {
        // Keep the raw fragment when it is not valid URI-encoded text.
      }

      const target = document.getElementById(id);

      if (
        !(target instanceof HTMLDetailsElement) ||
        !target.classList.contains("case-disclosure")
      ) {
        return;
      }

      target.open = true;
    };

    const openMatchingDisclosure = () => {
      openDisclosure(window.location.hash.slice(1));
    };

    const openLinkedDisclosure = (event: MouseEvent) => {
      const clicked = event.target;

      if (!(clicked instanceof Element)) {
        return;
      }

      const link = clicked.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) {
        return;
      }

      openDisclosure(link.hash.slice(1));
    };

    openMatchingDisclosure();
    document.addEventListener("click", openLinkedDisclosure);
    window.addEventListener("hashchange", openMatchingDisclosure);

    return () => {
      document.removeEventListener("click", openLinkedDisclosure);
      window.removeEventListener("hashchange", openMatchingDisclosure);
    };
  }, []);

  return null;
}
