import React from "react";

export default function Toast({ message, type }) {
  if (!message) return null;

  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  );
}
