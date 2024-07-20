import React from "react";

function NoPost() {
  return (
    <div className="mx-auto mt-6 w-[480px] rounded py-2 max-phones:w-full max-phones:rounded-none">
      <h1 className="text-center text-2xl font-bold">
        User hasn&apos;t uploaded anything yet.
      </h1>
    </div>
  );
}

export default NoPost;
