"use client";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChangeEvent, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  ArrowLeft,
  ImageIcon,
  RectangleHorizontal,
  RectangleVertical,
  RotateCcw,
  RotateCw,
  Square,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

function NewPostForm() {
  const [open, setOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const prevCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1 / 1);

  const selectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const handleCropImage = (croppedArea: Area, croppedAreaPixels: Area) => {
    if (!croppedAreaPixels) return;
    console.log(croppedAreaPixels);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <div
          className="w-full cursor-pointer justify-start rounded-full border p-2"
          onClick={() => setOpen(true)}
        >
          What&apos;s on your mind?
        </div>
      </DialogTrigger>
      <DialogContent className="w-[440px] gap-0 p-0 max-phones:w-96">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b px-1 py-3">
          <button className="">
            <ArrowLeft size={20} />
          </button>
          <DialogTitle className="w-fit">New Post</DialogTitle>
          <button className="rounded bg-blue-500 p-1 text-sm">Next</button>
        </DialogHeader>
        <div className="p-2">
          <form action="">
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2  border-dashed border-gray-400">
              {imgSrc ? (
                <div className="relative h-full w-full">
                  <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    minZoom={1}
                    aspect={aspect}
                    rotation={rotate}
                    onCropChange={setCrop}
                    onCropComplete={handleCropImage}
                  />
                  <div className="absolute bottom-0 flex w-full justify-between p-1">
                    <div className="flex gap-1 bg-white/60 p-1">
                      <span onClick={() => setZoom((prev) => prev - 0.1)}>
                        <ZoomOut size={20} />
                      </span>
                      <span onClick={() => setZoom((prev) => prev + 0.1)}>
                        <ZoomIn size={20} />
                      </span>
                    </div>
                    <div className="flex gap-1 bg-white/60 p-1">
                      <span onClick={() => setAspect(1 / 1)}>
                        <Square size={20} />
                      </span>
                      <span onClick={() => setAspect(16 / 9)}>
                        <RectangleHorizontal size={20} />
                      </span>
                      <span onClick={() => setAspect(4 / 5)}>
                        <RectangleVertical size={20} />
                      </span>
                    </div>
                    <div className="flex gap-1 bg-white/60 p-1">
                      <span onClick={() => setRotate((prev) => prev - 90)}>
                        <RotateCcw size={20} />
                      </span>
                      <span onClick={() => setRotate((prev) => prev + 90)}>
                        <RotateCw size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center"
                  >
                    <ImageIcon size={60} className="text-gray-400" />
                    <span className="rounded-lg bg-blue-500 px-4 py-1 text-white">
                      Select Photos
                    </span>
                  </label>
                  <input
                    onChange={selectedImage}
                    type="file"
                    accept="image/*"
                    name="photos"
                    id="file"
                    multiple
                    hidden
                  />
                </>
              )}
            </div>
          </form>
          {crop && (
            <canvas
              ref={prevCanvasRef}
              className="mt-4"
              style={{
                // display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            ></canvas>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewPostForm;
