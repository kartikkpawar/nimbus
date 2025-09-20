import React, { Fragment } from "react";
import { LogoMark } from "../LogoMark";
import clsx from "clsx";

const phrases = ["Joyful Experience", "Quality Material", "Precision Crafting"];

const Marquee = ({ direction }: { direction?: string }) => {
  const MarqueeContent = () => (
    <div className="flex items-center bg-gray-200 py-10 whitespace-nowrap">
      {phrases.map((item, i) => (
        <Fragment key={i}>
          <div className="font-bold-slanted px-14 text-[180px] leading-none text-gray-400/80 uppercase [text-box:trim-both_cap_alphabetic] md:text-[260px]">
            {item}
          </div>
          <LogoMark className="size-36 flex-shrink-0" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <section>
      <div
        className="relative flex w-full items-center overflow-hidden select-none"
        aria-hidden="true"
        role="presentation"
      >
        <div className="relative flex items-center whitespace-nowrap">
          <div
            className={clsx(
              "marquee-track animate-marquee flex",
              direction === "right" && "[animation-direction:reverse]",
            )}
          >
            {/* Content to duplicate */}
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
