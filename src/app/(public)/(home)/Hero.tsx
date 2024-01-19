'use client';
import { useRef } from "react";

const Hero = () => {
  const hero = useRef<HTMLElement | null>(null);
  return (
    <section ref={hero} id="hero" className="relative flex flex-col gap-8 items-center">
    </section>
  );
};

export default Hero;
