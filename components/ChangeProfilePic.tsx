"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import NextImage from "next/image";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import setCanvasPreview from "@/lib/setCanvasPreview";
import { User } from "lucide-react";
import { Button } from "./ui/button";

const MIN_DIM = 150;
const ASPECT_RATIO = 1;

function ChangeProfilePic({
  updateProfileUrl,
}: {
  updateProfileUrl: (data: File) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const prevCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const selectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgElem = new Image();
      const picUrl = reader.result?.toString() || "";

      imgElem.src = picUrl;

      imgElem.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;

        if (naturalHeight < MIN_DIM || naturalWidth < MIN_DIM) {
          setError(`Image must be at least ${MIN_DIM} by ${MIN_DIM}`);
          setImgUrl("");
          return;
        }
      });

      setImgUrl(picUrl);
    };
    reader.readAsDataURL(file);
  };

  const onImgLoad = (e: ChangeEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIM / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCropImage = () => {
    if (!crop || !imgRef.current || !prevCanvasRef.current) {
      setError("Something went wrong. Please try cropping the image again.");
      return;
    }

    setCanvasPreview(
      imgRef.current,
      prevCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current?.width, imgRef.current?.height),
    );
    const dataUrl = prevCanvasRef.current.toBlob((blob) => {
      const file = new File([blob as Blob], "image", { type: blob?.type });

      updateProfileUrl(file);
    });

    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <label
          onClick={() => {
            setOpen(true);
          }}
          htmlFor="profileImage"
          className="flex cursor-pointer items-center rounded bg-gray-300/50 px-2 py-1 text-sm backdrop-blur-sm transition-colors hover:bg-gray-300/70"
        >
          <User size={15} />
          <span className="phones:block ml-1 hidden text-xs">
            Change Profile Picture
          </span>
        </label>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0">
        <DialogTitle className="py-1 text-base">
          Change Profile Picture
        </DialogTitle>
        <label
          htmlFor="pfp"
          className=" my-1 w-fit rounded bg-primary p-1 text-sm text-white"
        >
          Select Profile Picture
        </label>
        <section className="flex gap-4">
          <input
            onChange={selectedImage}
            type="file"
            accept="image/*"
            id="pfp"
            hidden
          />
          {error && <div className="text-xs text-red-500">{error}</div>}
          {imgUrl && (
            <div className="flex flex-col">
              <ReactCrop
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                crop={crop}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minHeight={MIN_DIM}
              >
                <NextImage
                  ref={imgRef}
                  src={imgUrl}
                  alt=""
                  width={350}
                  height={350}
                  onLoad={onImgLoad}
                />
              </ReactCrop>

              <button
                className="mt-3 h-8 w-fit rounded bg-primary px-1 text-sm text-white"
                onClick={handleCropImage}
              >
                Crop Image
              </button>
            </div>
          )}

          {crop && (
            <canvas
              ref={prevCanvasRef}
              className="mt-4"
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            ></canvas>
          )}
        </section>
        <button
          className="w-fit place-self-end rounded bg-primary p-1 text-sm text-white"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeProfilePic;
