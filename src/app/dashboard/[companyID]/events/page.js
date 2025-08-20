import NotificationCard from "@/components/ui/NotificationCard";
import React from "react";

export default function Events() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Події</h2>
      </div>
      <div>
        <NotificationCard type={"subscribe"} />
        <NotificationCard type={"subscribe"} />
        <NotificationCard type={"unsubscribe"} />
      </div>
    </div>
  );
}
