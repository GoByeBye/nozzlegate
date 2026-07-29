"use client";

import { useEffect } from "react";

export function HashGuideOpener() {
  useEffect(() => {
    const openMatchingGuide = () => {
      const rawId = window.location.hash.slice(1);

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
        !target.classList.contains("issue-guide")
      ) {
        return;
      }

      document
        .querySelectorAll<HTMLDetailsElement>(".issue-guide")
        .forEach((guide) => {
          guide.open = guide === target;
        });
    };

    openMatchingGuide();
    window.addEventListener("hashchange", openMatchingGuide);

    return () => {
      window.removeEventListener("hashchange", openMatchingGuide);
    };
  }, []);

  return null;
}
