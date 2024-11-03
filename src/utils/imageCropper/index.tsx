import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "./ReactCrop.scss";
import "./index.scss";
import toastMsg from "@/utils/toaster";
import { Button } from "@/components/ui/button";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function CropImage({
  aspectRatio,
  imgSrc,
  previewNeeded,
  customFunction,
  customText,
  circularCrop,
}: {
  aspectRatio: string;
  imgSrc?: string;
  previewNeeded?: boolean;
  customFunction?: (file: File) => void;
  customText?: string;
  circularCrop?: boolean;
}) {
  const defaultAspect = Number(aspectRatio);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const [firstComplete, setFirstComplete] = useState(true);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleComplete = (adjustedCrop: any) => {
    setCompletedCrop(adjustedCrop);
  };

  return (
    <div className="image_cropper">
      {!!imgSrc && imgSrc != "null" && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={handleComplete}
          aspect={aspect}
          minWidth={400}
          minHeight={200}
          circularCrop={circularCrop}
          ruleOfThirds
          className="flex justify-center items-center"
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div className={`${previewNeeded ? `` : `hidden`}`}>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
      <div className="flex justify-center">
        {customFunction && (
          <Button
            className="p-2 h-auto rounded-lg mt-3 px-3"
            onClick={async () => {
              if (completedCrop && imgRef.current) {
                const image = imgRef.current;
                const previewCanvas = previewCanvasRef.current;
                if (!image || !previewCanvas || !completedCrop) {
                  toastMsg("error", "Please crop the image first");
                  return;
                }
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;

                const offscreen = new OffscreenCanvas(
                  completedCrop.width * scaleX,
                  completedCrop.height * scaleY
                );
                const ctx = offscreen.getContext("2d");
                if (!ctx) {
                  throw new Error("No 2d context");
                }

                ctx.drawImage(
                  previewCanvas,
                  0,
                  0,
                  previewCanvas.width,
                  previewCanvas.height,
                  0,
                  0,
                  offscreen.width,
                  offscreen.height
                );
                const blob = await offscreen.convertToBlob({
                  type: "image/png",
                });

                const file = new File([blob], "avatar.png", {
                  type: "image/png",
                });
                customFunction(file);
              } else {
                toastMsg("error", "Please crop the image first");
              }
            }}
          >
            {customText}
          </Button>
        )}
      </div>
    </div>
  );
}
