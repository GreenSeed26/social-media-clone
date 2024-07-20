"use client";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChangeEvent, useOptimistic, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import Image from "next/image";
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
import { getCroppedImage } from "@/lib/setCanvasPreview";
import { Post, User } from "@prisma/client";
import { useEdgeStore } from "@/lib/edgestore";
import { createPost } from "@/lib/actions";
import { PostButton2, PostButton3 } from "../FormButton";

function NewPostForm({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1 / 1);
  const [next, setNext] = useState(false);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);

  const { edgestore: es } = useEdgeStore();

  const selectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const handleCropImage = async (
    croppedArea: Area,
    croppedAreaPixels: Area
  ) => {
    if (!croppedAreaPixels) return;

    setCroppedAreaPixels(croppedAreaPixels);

    const croppedImgFile = await getCroppedImage(
      imgSrc || "",
      croppedAreaPixels,
      canvasRef.current as HTMLCanvasElement
    );

    setCroppedImageFile(croppedImgFile);
  };

  const handleUpload = async (formData: FormData) => {
    const image = croppedImageFile;
    const content = formData.get("postBody") as string;

    // Return early if there's no image and no content
    if (!image && !content) return;

    try {
      let vidUrl = "";
      let imgUrl: string[] = [];

      // Upload image if it exists
      if (image) {
        const res = await es.myPublicImages.upload({
          file: image,
          options: { temporary: true },
        });
        imgUrl.push(res.url);
      }

      // Create the post with the content and image URL
      await createPost(content, vidUrl, imgUrl);
      console.log("success");

      // Reset form and state
      setOpen(false);
      formRef.current?.reset();
      setImgSrc("");
      setNext(false);

      // Confirm image upload if there is an image URL
      if (imgUrl.length > 0) {
        await es.myPublicImages.confirmUpload({ url: imgUrl[0] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="w-full cursor-pointer justify-start rounded-full border p-2"
          onClick={() => setOpen(true)}
        >
          What&apos;s on your mind?
        </div>
      </DialogTrigger>
      <DialogContent
        className={`w-[440px] max-w-[440px] gap-0 px-0 py-2 max-phones:w-80 rounded-lg transition-all `}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b px-1 py-3">
          <button className="" onClick={() => setNext(false)}>
            <ArrowLeft size={20} />
          </button>
          <DialogTitle className="w-fit">New Post</DialogTitle>
          <button
            onClick={() => setNext(true)}
            className="rounded bg-blue-500 p-1 text-sm"
            disabled={next}
            style={{
              opacity: next ? 0 : 1,
            }}
          >
            Next
          </button>
        </DialogHeader>
        <div className="p-2">
          <form
            action={handleUpload}
            ref={formRef}
            className="flex max-phones:flex-col-reverse"
          >
            <PostButton2 next={next} />
            <div
              className={`flex aspect-square ${next ? "w-0 overflow-hidden" : "w-full border-2 border-dashed"} items-center justify-center rounded-lg  border-gray-400`}
            >
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
            <div
              className={` ${next ? "w-full max-phones:h-full" : "w-0 max-phones:h-0"} transition-all  overflow-hidden`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={user?.image || "/default_icon.png"}
                  alt=""
                  height={500}
                  width={500}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm">{user?.username}</span>
              </div>
              <textarea
                // ref={textAreaRef}
                className="h-28 w-full mt-2 resize-none whitespace-pre-wrap text-sm outline-none"
                name="postBody"
                placeholder={`What's on your mind, ${user?.username}?`}
              ></textarea>
              <div className=" w-full flex justify-center py-2">
                {croppedImageFile && (
                  <div className="relative">
                    <Image
                      src={URL.createObjectURL(croppedImageFile)}
                      alt="Cropped"
                      height={500}
                      width={500}
                      className="rounded-lg w-56"
                    />
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
              <PostButton3 />
            </div>
          </form>
          {/* {croppedImageFile && (
            <div>
              <h3>Cropped Image:</h3>
              <img src={URL.createObjectURL(croppedImageFile)} alt="Cropped" />
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewPostForm;
