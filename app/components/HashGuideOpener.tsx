"use client";

import { useEffect } from "react";

export function HashGuideOpener() {
  useEffect(() => {
    const guides = Array.from(
      document.querySelectorAll<HTMLDetailsElement>(".issue-guide"),
    );

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

      guides.forEach((guide) => {
        guide.open = guide === target;
      });
    };

    const keepOneGuideOpen = (event: Event) => {
      const openedGuide = event.currentTarget;

      if (
        !(openedGuide instanceof HTMLDetailsElement) ||
        !openedGuide.open
      ) {
        return;
      }

      guides.forEach((guide) => {
        if (guide !== openedGuide) {
          guide.open = false;
        }
      });
    };

    openMatchingGuide();
    guides.forEach((guide) => {
      guide.addEventListener("toggle", keepOneGuideOpen);
    });
    window.addEventListener("hashchange", openMatchingGuide);

    return () => {
      guides.forEach((guide) => {
        guide.removeEventListener("toggle", keepOneGuideOpen);
      });
      window.removeEventListener("hashchange", openMatchingGuide);
    };
  }, []);

  return null;
}
