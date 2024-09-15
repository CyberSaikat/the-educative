import Image, { ImageProps } from "next/image";
import React from "react";

interface LazyImageProps extends ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  credit?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "empty",
  blurDataURL,
  credit,
}) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`object-cover ${className}`}
        data-credit={credit}
        priority={true}
      />
    </>
  );
};

export default LazyImage;
