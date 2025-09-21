import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import React, { Fragment } from "react";
import MultipleKeyboards from "@/components/MultiKeyboard";
import KeyTypes from "@/components/KeyTypes";
import MarqueeText from "@/components/MarqueeText";
import PurchaseButton from "@/components/PurchaseButton";

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <KeyTypes />
      <MarqueeText />
      <Bento />
      <MarqueeText direction="right" />
      <MultipleKeyboards />
      <PurchaseButton />
    </Fragment>
  );
}
