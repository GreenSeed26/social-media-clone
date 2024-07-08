"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import CreatePostForm from "./CreatePostForm";

const CreatePost = ({
  username,
  open,
  setOpen,
}: {
  username: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start rounded-full"
          variant="outline"
          onClick={handleDialogOpen}
        >
          What&apos;s on your mind?
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed w-[500px] max-phones:w-96">
        <X
          size={20}
          className="absolute right-0 -translate-x-4 translate-y-4 focus:outline"
          onClick={() => setOpen(false)}
        />
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>{username}</DialogDescription>
        </DialogHeader>
        <CreatePostForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
