import Link from "next/link";
import React from "react";

function SideBar({ className }: { className: string }) {
  return <ul>
    
    <Link className={className} href={"/"}></Link>
  </ul>;
}

export default SideBar;
