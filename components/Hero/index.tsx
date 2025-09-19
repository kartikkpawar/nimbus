"use client";
import React from "react";
import { Bounded } from "../Bounded";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./Scene";

export default function Hero() {
  return (
    <section className="blue-gradient-bg relative h-dvh text-white text-shadow-black/30 text-shadow-lg">
      <div className="hero-scene pointer-events-none sticky top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <HeroScene />
        </Canvas>
      </div>

      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="absolute inset-x-0 top-18 md:top-24 md:left-[8vw]"
        >
          <h1 className="hero-heading font-black-slanted text-6xl leading-[0.8] uppercase sm:text-7xl lg:text-8xl">
            Built For
            <br />
            the Bold
          </h1>
        </Bounded>

        <Bounded
          fullWidth
          className="hero-body absolute inset-x-0 bottom-0 md:right-[8vw] md:left-auto"
          innerClassName="flex flex-col gap-3"
        >
          <div className="max-w-md">
            <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
              Typing Reinvented
            </h2>
            <span>
              Fall in love with craft thanks to our professional grade keycaps
              and switches
            </span>
          </div>
          <button className="font-bold-slanted clic group flex w-fit cursor-pointer items-center gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase transition disabled:grayscale">
            Buy Vapor75{" "}
            <span className="transition group-hover:translate-x-1">{">"}</span>
          </button>
        </Bounded>
      </div>
    </section>
  );
}
