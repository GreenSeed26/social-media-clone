"use client";
import Carousel from "@/components/FeedComponents/Carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { editPost, getPost } from "@/lib/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

function EditPost({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => getPost(params.id),
    staleTime: 1000 * 60,
    refetchInterval: 1000,
  });

  let postBody = data?.postBody as string;

  const [newPostBody, setNewPostBody] = useState<string>(postBody);

  const { mutateAsync: updatePost } = useMutation({
    mutationFn: (variable: { postId: string; postBody: string }) =>
      editPost(variable),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleNewPostBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostBody(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parameters = { postId: params.id, postBody: newPostBody };

    if (!newPostBody) return;

    setLoading(true);

    try {
      await updatePost(parameters);
      // Optionally, handle success (e.g., show a notification or redirect)
    } catch (error) {
      // Handle error
      console.log(error);
    }
    toast({
      title: "Success",
      description: "Post Edited",
    });
    setLoading(false);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex h-[90dvh] items-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-2 rounded-lg border bg-white p-2 sm:w-[520px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="h-20 w-full resize-none rounded-lg bg-gray-200 px-2 text-sm outline-none"
          value={newPostBody}
          onChange={handleNewPostBody}
        ></textarea>
        <Carousel images={data?.postImage || []} />
        <Button disabled={loading} type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default EditPost;
