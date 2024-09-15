// components/LogoCarousel.js
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CLogo from "./c";
import GitLogo from "./git";
import JavaLogo from "./java";
import PHPLogo from "./php";
import PythonLogo from "./python";
import JavaScriptLogo from "./js";
import GoLangLogo from "./golang";
import KotlinLogo from "./kotlin";

const animation = { duration: 5000, easing: (t: number) => t };

const LogoCarousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 6, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    created(s) {
      s.moveToIdx(6, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 6, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 6, true, animation);
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider mt-[60px] xl:mt-[80px] w-full">
      <div className="keen-slider__slide">
        <PythonLogo />
      </div>
      <div className="keen-slider__slide">
        <PHPLogo />
      </div>
      <div className="keen-slider__slide">
        <JavaLogo />
      </div>
      <div className="keen-slider__slide">
        <CLogo />
      </div>
      <div className="keen-slider__slide">
        <GitLogo />
      </div>
      <div className="keen-slider__slide">
        <JavaScriptLogo />
      </div>
      <div className="keen-slider__slide">
        <KotlinLogo />
      </div>
      <div className="keen-slider__slide">
        <GoLangLogo />
      </div>
    </div>
  );
};

export default LogoCarousel;
