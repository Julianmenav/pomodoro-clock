import React from "react";

export default function CloseMenu() {
  return (
    <div className="flex ">
      <div className="closeMenu cursor-pointer rounded-xl p-1.5 text-zinc-300 hover:bg-zinc-300/[0.1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
