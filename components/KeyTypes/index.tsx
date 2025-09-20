"use client";
import React from "react";
import { Bounded } from "../Bounded";
import FadeIn from "../FadeIn";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { SOUND_MAP, Switch } from "../Switch";
import { Stage } from "@react-three/drei";
import { LucideVolume2 } from "lucide-react";
import gsap from "gsap";

type SwitchProps = {
  id: "red" | "blue" | "brown" | "black";
  name: string;
  hexCode: string;
};

const switchData: SwitchProps[] = [
  { id: "red", name: "Red Max", hexCode: "#C92627" },
  { id: "brown", name: "Brown Max", hexCode: "#6E3205" },
  { id: "blue", name: "Blue Max", hexCode: "#0F80E7" },
  { id: "black", name: "Black Max", hexCode: "#000000" },
];

export default function index() {
  return (
    <Bounded className="relative" innerClassName="flex flex-col justify-center">
      <FadeIn>
        <h2 className="font-bold-slanted scroll-pt-6 text-6xl uppercase md:text-8xl">
          Craft your click
        </h2>
        <span className="mb-6 max-w-4xl text-xl text-pretty">
          The Vapor75 can be customized with one of four premium switch types.
        </span>

        <FadeIn
          targetChildren
          className="grid grid-cols-1 gap-4 outline-hidden sm:grid-cols-2"
        >
          {switchData.map((item) => (
            <SwitchWrapper key={item.id} {...item} />
          ))}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
}

function SwitchWrapper({ hexCode, id: color, name }: SwitchProps) {
  const bgColor = {
    blue: "bg-sky-950",
    red: "bg-red-950",
    brown: "bg-amber-950",
    black: "bg-gray-900",
  }[color];

  const handleSound = () => {
    const selectedSound = gsap.utils.random(SOUND_MAP[color]);

    const audio = new Audio(selectedSound);
    audio.volume = 0.6;
    audio.play();
  };

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      <button
        onClick={handleSound}
        className="font-bold-slanted absolute bottom-0 left-0 z-10 flex items-center gap-3 p-6 text-4xl text-white uppercase focus:ring-2 focus:ring-white focus:outline-none"
      >
        {name} <LucideVolume2 />
      </button>
      <Canvas
        camera={{
          position: [1.5, 2, 0],
          fov: 7,
        }}
      >
        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment={"city"}
        >
          <Switch
            rotation={[0, Math.PI / 4, 0]}
            color={color}
            hexColor={hexCode}
          />
        </Stage>
      </Canvas>
      <div
        className={clsx(
          "font-black-slanted gri absolute inset-0 -z-10 grid place-items-center text-8xl uppercase",
          bgColor,
        )}
      >
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={18}
            className="font-bold-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white/100 motion-safe:transition-all motion-safe:duration-700"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <tspan
                key={index}
                x={`${(index + 1) * 10}`}
                dy={index === 0 ? -40 : 14}
              >
                {name}
                {name}
                {name}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
}
