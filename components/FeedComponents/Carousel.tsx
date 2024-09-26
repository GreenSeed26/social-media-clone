"use client";
import Image from "next/image";

function Carousel({ images }: { images: string[] }) {
  const imgBox = "border border-white object-cover overflow-hidden";

  return (
    <>
      {images.length > 1 && (
        <div className="grid auto-rows-[200px] grid-cols-2 rounded-lg">
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`${imgBox} relative ${images.length == 3 && i == 2 - 1 ? "row-span-2 " : ""}`}
            >
              {i === 3 && images.length > 4 && (
                <div className="absolute flex h-full w-full items-center justify-center bg-black/50">
                  <span className="text-3xl text-white">
                    + {images.length - 4}
                  </span>
                </div>
              )}

              <Image
                src={img}
                alt={images.length.toLocaleString()}
                className="block h-full rounded object-cover"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      )}
      {images.length === 1 && (
        <div className="py-1">
          <div className="relative">
            <Image
              src={images[0]}
              alt=""
              width={500}
              height={500}
              className="block h-auto rounded-lg object-cover md:max-w-80"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Carousel;

{
  /* <div className="w-full max-w-80 py-1 lg:h-[500px]">
<div className="relative h-full">
  <div className="flex h-full w-full overflow-hidden rounded-lg">
    {images.map((url, index) => (
      <Image
        key={index}
        src={url}
        alt=""
        width={1000}
        height={1000}
        style={{ transform: `translateX(${-100 * curr}%)` }}
        className="block h-full shrink-0 grow-0 object-cover transition-transform duration-300 ease-in-out"
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
</div> */
}
