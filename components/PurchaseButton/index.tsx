"use client";
import { useRef } from "react";
import { Bounded } from "@/components/Bounded";
import FadeIn from "@/components/FadeIn";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LucideChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function PurchaseButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const handlePurchaseClick = () => {
    router.push("/success");
  };

  useGSAP(() => {
    if (!buttonRef.current || !textRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !textRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;

      const normalizedX = Math.max(0, Math.min(1, mouseX / buttonWidth));

      const newWdth = 120 - normalizedX * 70; // 120 = thinner, 50 = wider
      const newWght = 700 + normalizedX * 300; // 700 = lighter, 1000 = bolder

      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newWght,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        "--wdth": 85,
        "--wght": 850,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    buttonRef.current?.addEventListener("mousemove", handleMouseMove);
    buttonRef.current?.addEventListener("mouseleave", handleMouseLeave);

    gsap.set(textRef.current, { "--wdth": 85, "--wght": 850 });

    return () => {
      if (buttonRef.current) {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  });

  return (
    <Bounded>
      <FadeIn
        className="relative mx-auto max-w-7xl px-4 text-center"
        targetChildren
      >
        <p className="mb-6 text-xl font-medium text-gray-700 md:text-2xl">
          Experience Peak Performance
        </p>

        <h2
          id="buy-button"
          className="font-bold-slanted mb-8 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl"
        >
          Order Yours Now
        </h2>

        <button
          ref={buttonRef}
          onClick={handlePurchaseClick}
          className={clsx(
            "group relative w-full overflow-hidden rounded-full border-8 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 px-8 py-6 ease-out focus:ring-[24px] focus:ring-sky-500/50 focus:outline-none motion-safe:transition-all motion-safe:duration-300 md:border-[12px] md:px-20 md:py-16",
            "hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40",
            "cursor-pointer active:scale-95",
          )}
        >
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />

          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
            <span
              ref={textRef}
              style={{ "--wdth": 85, "--wght": 850 } as React.CSSProperties}
              className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl"
            >
              Buy Vapor75
            </span>

            <div className="hidden group-hover:translate-x-2 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
              <LucideChevronRight className="size-12 text-gray-900 md:size-16" />
            </div>
          </div>
        </button>

        <div className="mt-12 flex flex-col space-y-3 text-center text-base text-gray-600 md:text-lg">
          <h2 className="font-bold">
            {" "}
            Free worldwide shipping • 30-day guarantee • 2-year warranty
          </h2>
          Join 10,000+ satisfied customers worldwide
        </div>
      </FadeIn>
    </Bounded>
  );
}
