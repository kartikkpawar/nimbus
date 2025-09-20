import clsx from "clsx";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

export default function FadeIn({
  children,
  className,
  start = "top 95%",
  targetChildren = false,
  vars = {},
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetChildren
      ? containerRef.current?.children
      : containerRef.current;

    if (!target) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion:no-preference)", () => {
      gsap.set(target, {
        opacity: 0,
        y: 16,
      });

      gsap.to(target, {
        duration: 0.8,
        opacity: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.2,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      });
    });
  });

  return (
    <div className={clsx(className)} ref={containerRef}>
      {children}
    </div>
  );
}
