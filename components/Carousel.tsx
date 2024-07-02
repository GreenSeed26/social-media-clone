"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Carousel({ images }: { images: string[] }) {
  const [curr, setCurr] = useState<number>(0);

  const prev = () =>
    setCurr((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  const next = () =>
    setCurr((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  return (
    <>
      {images.length > 1 && (
        <div className="h-[500px] w-full bg-black">
          <div className="relative h-full w-full">
            <Image
              src={images[curr]}
              alt=""
              width={500}
              height={500}
              className="block h-full w-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-between p-2">
              <button
                onClick={prev}
                className="cursor-pointer rounded-full bg-white/30 p-2 text-black"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="cursor-pointer rounded-full bg-white/30 p-2 text-black"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {images.length === 1 && (
        <div className="h-[500px] w-full bg-black">
          <Image
            src={images[0]}
            alt=""
            width={500}
            height={500}
            className="block h-full w-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default Carousel;
