"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function Photo({ params }: { params: { photo: string } }) {
  return <div>{params.photo}</div>;
}

export default Photo;

