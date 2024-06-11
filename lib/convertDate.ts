import { ReactNode } from "react";

export function convertToLocaleString(createdAt: string | Date): ReactNode {
  const dateString = createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate // Output: May 10, 2024
}