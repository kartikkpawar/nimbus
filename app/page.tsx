import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import React, { Fragment } from "react";
import MultipleKeyboards from "@/components/MultiKeyboard";

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <Bento />
      <MultipleKeyboards />
    </Fragment>
  );
}
