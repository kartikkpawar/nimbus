"use client";
import React, { useMemo, useRef, useState } from "react";
import { Keyboard } from "../Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import * as Three from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

export default function Scene({
  onAnimationComplete,
  selectedTextureId,
}: Props) {
  const texturePath = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePath);
  const keyboardRef = useRef<Three.Group>(null);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion:no-preference)", () => {
      const keyboard = keyboardRef.current;
      if (!keyboard) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete();
        },
      });
      tl.to(keyboard.position, {
        y: 0.3,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setCurrentTextureId(selectedTextureId),
      });
      tl.to(keyboard.position, {
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1,0.4)",
      });
    });

    mm.add("(prefers-reduced-motion:reduced)", () => {
      setCurrentTextureId(selectedTextureId);
      onAnimationComplete();
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: Three.MeshStandardMaterial } = {};
    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;
      if (texture) {
        texture.flipY = false;
        texture.colorSpace = Three.SRGBColorSpace;

        materialMap[textureConfig.id] = new Three.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });
    return materialMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (t) => t.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={"city"} intensity={0.05} shadows={"contact"}>
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
}
