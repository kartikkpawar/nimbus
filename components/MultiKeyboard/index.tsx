"use client";
import React, { useCallback, useState } from "react";
import { Bounded } from "../Bounded";
import clsx from "clsx";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
export const KEYCAP_TEXTURES = [
  {
    id: "goodwell",
    name: "Goodwell",
    path: "/goodwell_uv.png",
    knobColor: "#E44E21",
  },
  {
    id: "dreamboard",
    name: "Dreamboard",
    path: "/dreamboard_uv.png",
    knobColor: "#E9759F",
  },
  {
    id: "cherrynavy",
    name: "Cherry Navy",
    path: "/cherrynavy_uv.png",
    knobColor: "#F06B7E",
  },
  { id: "kick", name: "Kick", path: "/kick_uv.png", knobColor: "#FD0A0A" },
  {
    id: "oldschool",
    name: "Old School",
    path: "/oldschool_uv.png",
    knobColor: "#B89D82",
  },
  {
    id: "candykeys",
    name: "Candy Keys",
    path: "/candykeys_uv.png",
    knobColor: "#F38785",
  },
];
type KeycapTexture = (typeof KEYCAP_TEXTURES)[number];
export default function MultipleKeyboards() {
  const [selectedTextureId, setSelectedTextureId] = useState(
    KEYCAP_TEXTURES[0].id,
  );

  const [backgroundText, setBackgroundText] = useState(KEYCAP_TEXTURES[0].name);

  const [isAnimating, setIsAnimating] = useState(false);

  function handleTextureSelect(texture: KeycapTexture) {
    if (texture.id === selectedTextureId || isAnimating) return;
    setIsAnimating(true);
    setSelectedTextureId(texture.id);
    setBackgroundText(
      KEYCAP_TEXTURES.find((t) => t.id === texture.id)?.name || "",
    );
  }

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);
  return (
    <section className="bg-la relative flex h-[90vh] min-h-[1000px] flex-col bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white outline-hidden">
      <svg
        className="height-auto pointer-events-none absolute top-0 left-0 w-full mix-blend-overlay"
        viewBox="0 0 75 100"
      >
        <text
          className="font-bold-slanted fill-white/20 uppercase group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700"
          fontSize={7}
          textAnchor="middle"
          dominantBaseline="middle"
          x="50%"
          y="50%"
        >
          {Array.from({ length: 20 }, (_, index) => (
            <tspan
              key={index}
              x={`${(index + 1) * 10}%`}
              dy={index === 0 ? -50 : 6}
            >
              {Array.from({ length: 10 }, () => backgroundText).join(" ")}
            </tspan>
          ))}
        </text>
      </svg>
      <Canvas
        camera={{ position: [0, 0.6, 0.5], fov: 45, zoom: 1.5 }}
        className="-mb-[10vh] grow"
      >
        <Scene
          selectedTextureId={selectedTextureId}
          onAnimationComplete={handleAnimationComplete}
        />
      </Canvas>
      <Bounded
        className="relative shrink-0"
        innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row"
      >
        <div className="max-w-md shrink-0">
          <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
            Custom Keycaps
          </h2>
          <div className="text-pretty lg:text-lg">
            Choose from different keycap materials and see how they transform
            your keyboard&apos;s appearance in real-time.
          </div>
        </div>
        <ul className="grid grow grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button
                onClick={() => handleTextureSelect(texture)}
                className={clsx(
                  "flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-all motion-safe:duration-300",
                  selectedTextureId === texture.id
                    ? "border-[#81BFED] bg-[#81BFED]/20"
                    : "cursor-pointer border-gray-300 hover:border-gray-500",
                  isAnimating && "cursor-not-allowed opacity-50",
                )}
                disabled={isAnimating}
              >
                <div className="mb-3 overflow-hidden rounded border-2 border-black bg-gray-100">
                  <Image
                    src={texture.path}
                    alt={texture.name}
                    height={255}
                    width={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-center text-sm font-semibold">
                  {texture.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bounded>
    </section>
  );
}
