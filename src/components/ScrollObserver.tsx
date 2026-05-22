"use client";

import { useEffect } from 'react';

export function ScrollObserver() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Optional: remove class when scrolling away
          // entry.target.classList.remove('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const target = document.getElementById('modules');
    
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return null;
}
