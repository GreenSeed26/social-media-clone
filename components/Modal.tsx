"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Modal({
  pfp,
  open,
  close,
}: {
  pfp: string | null;
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className=" border-0 bg-background/0 shadow-none">
          <div className="relative flex items-center justify-center">
            <Image
              className="size-72 rounded-full"
              src={
                pfp ||
                "/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd1058c25.3471458915218475050227.png"
              }
              alt="pfp"
              width={400}
              height={400}
            />
            <button
              className="absolute right-0 top-0 text-white outline-none"
              onClick={() => close(false)}
            >
              <X />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
