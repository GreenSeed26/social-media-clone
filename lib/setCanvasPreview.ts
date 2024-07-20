import { Area } from "react-easy-crop";
import { PixelCrop } from "react-image-crop";

export const canvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d Context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export const getCroppedImage = (
  imageSrc: string,
  pixelCrop: Area,
  canvas: HTMLCanvasElement
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("No 2d Context"));
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "image2bcropped", {
            type: "image/png",
          });
          resolve(file);
        }
      }, "image/png");
    };
    image.onerror = (err) => {
      reject(err);
    };
  });
};
