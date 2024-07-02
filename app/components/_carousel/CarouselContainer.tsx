import React from "react";
import Image from "next/image";
import TechCarousel from "./TechCarousel";

const CarouselContainer = () => {
  return (
    <section className="w-full lg:w-[65%] xl:w-1/2  carousel rounded-box grid justify-center  mx-auto h-auto py[-5rem]">
      <TechCarousel />
    </section>
  );
};

export default CarouselContainer;
