"use client";
import clsx from "clsx";
import { Bounded } from "../Bounded";
import Image from "next/image";

type BentoBoxProps = {
  image: string;
  heading: string;
  subText: string;
  size: string;
};

export default function Bento() {
  const bentoData = [
    {
      image: "/render_6.png",
      heading: "Full aluminum case.",
      subText: "Premium materials for satisfying heft and durability.",
      size: "large",
    },
    {
      image: "/render_5_angled.png",
      heading: "Interchangeable knob system.",
      subText: "Customize your control dial to click, scroll, or press.",
      size: "small",
    },
    {
      image: "/render_2.png",
      heading: "Cross Platform. ",
      subText: "Mac, Windows, or Linux, Nimbus adapts to your workflow.",
      size: "medium",
    },
    {
      image: "/render_9.png",
      heading: "Hot-Swappable Switches.",
      subText: "Change your feel without any soldering.",
      size: "medium",
    },
    {
      image: "/render_11_3.png",
      heading: "Custom Nimbus Keycap Profile.",
      subText: "Designed for long coding sessions.",
      size: "small",
    },
    {
      image: "/render_3.png",
      heading: "E-Ink Display Screen.",
      subText: "Show battery, status, or a custom design.",
      size: "large",
    },
  ];

  return (
    <Bounded>
      <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl">
        Vapor75 Features
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {bentoData.map((bento) => (
          <BentoBoxItem item={bento} key={bento.image} />
        ))}
      </div>
    </Bounded>
  );
}

function BentoBoxItem({ item }: { item: BentoBoxProps }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-3xl",
        item.size === "small" && "md:col-span-2",
        item.size === "medium" && "md:col-span-3",
        item.size === "large" && "md:col-span-4",
      )}
    >
      <Image
        src={item.image}
        height={700}
        width={700}
        alt={item.heading}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />
      <span className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
        <span className="font-bold">{item.heading} </span>
        {item.subText}
      </span>
    </div>
  );
}
