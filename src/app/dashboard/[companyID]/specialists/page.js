import ClientCard from "@/components/admin/ClientCard";
import InviteWorker from "@/components/admin/InviteWorker";
// import InviteWorker from "@/components/admin/InviteWorker";
import React from "react";

export default function Specialists() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Працівники</h2>
      </div>
      <div className="mb-6">
        <InviteWorker />
      </div>
      <div>
        <ClientCard />
      </div>
    </div>
  );
}
