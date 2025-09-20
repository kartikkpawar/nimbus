import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import React, { Fragment } from "react";
import MultipleKeyboards from "@/components/MultiKeyboard";
import KeyTypes from "@/components/KeyTypes";

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <Bento />
      <KeyTypes />
      <MultipleKeyboards />
    </Fragment>
  );
}
