import ClientCard from "@/app/components/admin/ClientCard";
import ClientsWidget from "@/app/components/admin/ClientsWidget";
import React from "react";

export default function Clients() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Клієнти</h2>
      </div>
      <div className="mb-8 ">
        <ClientsWidget />
      </div>
      <div className="mb-8">
        {/* <h2 className="font-bold text-xl">Всі клієнти</h2> */}

        <ClientCard />
      </div>
    </div>
  );
}
