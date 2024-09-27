"use client"; // Required in Next.js 13 for components using client-side hooks

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ColorCarousel: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Array of colors representing the images in the carousel
  const colors: string[] = ["red", "green", "blue", "green", "cyan", "#FEFAF6"];

  // Get img_index from URL search params, or default to 1 (first color)
  const imgIndexParam = searchParams.get("img_index");
  const currentIndex: number = imgIndexParam ? parseInt(imgIndexParam) - 1 : 0;

  const [currentColorIndex, setCurrentColorIndex] =
    useState<number>(currentIndex);

  // Update the URL when the currentColorIndex changes
  useEffect(() => {
    router.replace(`?img_index=${currentColorIndex + 1}`);
  }, [currentColorIndex, router]);

  // Navigate to the next color
  const handleNext = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  // Navigate to the previous color
  const handlePrev = () => {
    setCurrentColorIndex(
      (prevIndex) => (prevIndex - 1 + colors.length) % colors.length,
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Display the color block as the "image" */}
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: colors[currentColorIndex],
          margin: "0 auto",
        }}
      />
      <p>
        Color {currentColorIndex + 1} of {colors.length}
      </p>
      {/* Prev and Next Buttons */}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext} style={{ marginLeft: "10px" }}>
        Next
      </button>
    </div>
  );
};

export default ColorCarousel;
