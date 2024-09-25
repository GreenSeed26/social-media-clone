"use client";

import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function VidComponent({ video }: { video: string | null }) {
  const [progress, setProgress] = useState(0);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsplaying] = useState(false);
  const [mute, setMute] = useState(true);

  return (
    <>
      {video && (
        <div className="group relative overflow-hidden">
          <video
            className="h-[500px] w-full rounded bg-black object-contain"
            height={675}
            width={1200}
            ref={vidRef}
            muted={mute}
            loop
            onTimeUpdate={(e) => {
              const curr =
                (e.currentTarget.currentTime / e.currentTarget.duration) * 100;
              setProgress(curr);

              if (vidRef.current?.ended) return setIsplaying(false);
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-0 flex h-8 w-full translate-y-8 items-center gap-2 rounded-b bg-gradient-to-t from-black to-white/0 px-2 transition-all group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (vidRef.current?.paused) {
                  setIsplaying(true);
                  vidRef.current?.play();
                } else {
                  setIsplaying(false);
                  vidRef.current?.pause();
                }
              }}
            >
              {isPlaying ? (
                <Pause size={18} fill="white" color="white" />
              ) : (
                <Play size={18} fill="white" color="white" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMute((curr) => !curr);
              }}
            >
              {mute ? (
                <VolumeX size={18} fill="white" color="white" />
              ) : (
                <Volume2 size={18} fill="white" color="white" />
              )}
            </button>

            <div className="relative mx-1.5 flex h-1 flex-1 items-center rounded-full bg-gray-400/20">
              <div className="bg-[rgb(1, 1, 65)] w-full">
                <div
                  className="absolute top-0 h-full rounded-full bg-white/60 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VidComponent;
