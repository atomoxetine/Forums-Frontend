'use client';
import { useRef } from "react";

const Hero = () => {
  const hero = useRef<HTMLElement | null>(null);
  return (
    <section ref={hero} id="hero" className="relative flex flex-col gap-8 items-center">
      <div className="absolute inset-0 h-full w-full justify-center bg-grad-filter" style={{ zIndex: 0 }}></div>

      <span className="w-fit flex flex-col items-center justify-center my-auto font-bold scale-75 sm:scale-95 md:scale-110">
        <h2 className="whitespace-nowrap uppercase text-neutral text-center">
          Expertise.<br />Innovation.<br />Client Focus.<br />Quality of Work.
        </h2>

        <h1 className="inline-flex flex-nowrap items-end logo-rainbow m-0 p-0">
          PinkCl<div id="cloudMask" className="mx-0.5 mb-[0.3125rem]" />ud
        </h1> 
      </span>
    </section>
  );
};

export default Hero;
