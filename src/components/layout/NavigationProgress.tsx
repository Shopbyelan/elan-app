"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  function startProgress() {
    setVisible(true);
    setWidth(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    let w = 0;
    intervalRef.current = setInterval(() => {
      w += Math.random() * 12 + 3;
      if (w >= 88) {
        w = 88;
        clearInterval(intervalRef.current!);
      }
      setWidth(w);
    }, 180);
  }

  function endProgress() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setWidth(100);
    setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 450);
  }

  // Complete when pathname changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      endProgress();
    }
  }, [pathname]);

  // Intercept internal link clicks to start progress
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === pathname) return;
        startProgress();
      } catch {
        // ignore malformed URLs
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
      <div
        className="h-full bg-[#85A0B5] transition-[width] ease-out"
        style={{
          width: `${width}%`,
          transitionDuration: width === 100 ? "300ms" : "160ms",
          boxShadow: "0 0 8px rgba(133,160,181,0.6), 0 0 2px rgba(133,160,181,0.4)",
        }}
      />
    </div>
  );
}
