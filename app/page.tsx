import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import React, { Fragment } from "react";
import MultipleKeyboards from "@/components/MultiKeyboard/MultipleKeyboards";

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <Bento />
      <MultipleKeyboards />
    </Fragment>
  );
}
