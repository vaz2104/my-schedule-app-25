import React from "react";
import Thumbnail from "../ui/Thumbnail";

export default function BotCard({ name, thumbnail }) {
  return (
    <div className="w-full flex items-center border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100 px-4 py-2 lg:max-w-80 mx-auto transition-all">
      <Thumbnail url={thumbnail} />
      <span className="ml-4 font-bold">{name}</span>
    </div>
  );
}
