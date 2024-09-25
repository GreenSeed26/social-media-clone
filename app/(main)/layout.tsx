import { ReactNode } from "react";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { CustomProvider } from "rsuite";
import Navbar from "@/components/Navbar";

function HomeLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <EdgeStoreProvider>
        <CustomProvider>
          <div className="mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col items-center bg-gray-100">
            <Navbar />
            {children}
          </div>
          {modal}
        </CustomProvider>
      </EdgeStoreProvider>
    </>
  );
}

export default HomeLayout;
