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
        <div className="h-[500px] w-full">
          <div className="relative h-full w-full">
            <div className="flex h-full w-full overflow-hidden ">
              {images.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt=""
                  width={700}
                  height={700}
                  style={{ transform: `translateX(${-100 * curr}%)` }}
                  className="block h-full w-full shrink-0 grow-0 rounded-lg object-cover transition-transform duration-300 ease-in-out"
                />
              ))}
            </div>

            <div className="absolute top-0 flex h-full items-center px-2">
              <div
                onClick={prev}
                className="cursor-pointer rounded-full bg-white/30 p-2 text-black"
                style={{ display: `${curr === 0 ? "none" : "block"}` }}
              >
                <ChevronLeft size={20} />
              </div>
            </div>
            <div className="absolute right-0 top-0 flex h-full items-center px-2">
              <div
                onClick={next}
                className="cursor-pointer rounded-full bg-white/30 p-2 text-black"
                style={{
                  display: `${curr === images.length - 1 ? "none" : "block"}`,
                }}
              >
                <ChevronRight size={20} />
              </div>
            </div>
            <div className="absolute bottom-2 flex h-4 w-full items-center justify-center gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={` cursor-pointer rounded-full  ${index === curr ? "size-1.5 bg-white" : "size-1 bg-white/30"} transition-all duration-500 ease-in-out`}
                  onClick={() => setCurr(index)}
                ></div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="absolute right-0 top-0 m-2 rounded-xl bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                {curr + 1}/{images.length}
              </div>
            )}
          </div>
        </div>
      )}
      {images.length === 1 && (
        <div className="w-full">
          <Image
            src={images[0]}
            alt=""
            width={700}
            height={700}
            className="block h-auto w-full rounded-lg"
          />
        </div>
      )}
    </>
  );
}

export default Carousel;
