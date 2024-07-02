import React from "react";
import styles from "./TechCarousel.module.css";
import { reactFeatures, techStacks } from "./mocksData";


const TechCarousel: React.FC = () => {
  return (
    <div className={`${styles.carouselContainer} shadow py-[1rem] px-[2rem]`}>
      <div className={`${styles.carouselTrack} ${styles.scrollRight}`}>
        <CarouselItems data={techStacks.map((item) => item.name)} />
        <CarouselItems data={techStacks.map((item) => item.name)} />
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
      </div>

      <div className={`${styles.carouselTrack} ${styles.scrollLeft}`}>
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
        <CarouselItems data={techStacks.map((item) => item.name)} />
      </div>

      <div className={`${styles.carouselTrack} ${styles.scrollRight}`}>
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
        <CarouselItems data={techStacks.map((item) => item.name)} />
        <CarouselItems data={techStacks.map((item) => item.name)} />
      </div>

      <div className={`${styles.carouselTrack} ${styles.scrollLeft} `}>
        <CarouselItems data={techStacks.map((item) => item.name)} />
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
        <CarouselItems data={reactFeatures.map((item) => item.react)} />
      </div>
    </div>
  );
};

export default TechCarousel;

export const CarouselItems: React.FC<{ data: string[] }> = ({ data }) => {
  return (
    <div className="flex items-center h-1/2">
      {data.map((item, index) => (
        <div key={index} className={`${styles.carouselItem} px-5 py-3 md:px-6 md:py-4 border`}>
          <span className="text-lg md:text-xl">{item}</span>
        </div>
      ))}
    </div>
  );
};
