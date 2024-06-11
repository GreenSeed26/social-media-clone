"use client";

import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useState } from "react";

function ImageUpload() {
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const { edgestore } = useEdgeStore();

  const handleSubmit = async () => {
    if (file) {
      const res = await edgestore.myPublicImages.upload({ file: file });
      setUrls({
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
      });
    }
  };
  return (
    <div className="m-6 flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        className="rounded bg-white px-2 text-black hover:opacity-80"
        onClick={handleSubmit}
      >
        Upload
      </button>

      {urls?.url && (
        <Link href={urls.url} target="_blank">
          URL
        </Link>
      )}
      {urls?.thumbnailUrl && (
        <Link href={urls.thumbnailUrl} target="_blank">
          thumbnail
        </Link>
      )}
    </div>
  );
}

export default ImageUpload;
