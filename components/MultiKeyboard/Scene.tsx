import React, { useMemo } from "react";
import { Keyboard } from "../Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from "./MultipleKeyboards";
import * as Three from "three";

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
    <group>
      <Stage environment={"city"} intensity={0.05} shadows={"contact"}>
        <Keyboard
          keycapMaterial={materials[selectedTextureId]}
          knobColor={currentKnobColor}
        />
      </Stage>
    </group>
  );
}
