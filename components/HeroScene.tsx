"use client";
import React from "react";
import { Keyboard } from "./Keyboard";
import { Environment, PerspectiveCamera } from "@react-three/drei";

export default function HeroScene() {
  return (
    <group>
      <PerspectiveCamera position={[0, 0, 4]} fov={50} makeDefault />
      <Keyboard
        scale={9}
        position={[0.2, -0.5, 1.9]}
        rotation={[1.6, 0.4, 0]}
      />

      <Environment
        files={["/hdr/blue-studio.hdr"]}
        environmentIntensity={0.05}
      />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30}
        castShadow
        shadow-bias={-0.0002}
        shadow-normalBias={0.0002}
        shadow-mapSize={1024}
      />
    </group>
  );
}
