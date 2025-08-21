import React from "react";
import ClientCard from "./ClientCard";

export default function ClientsList({ clients }) {
  if (!clients?.length)
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-4">
          <p>У Вас поки немає клієнтів, що користуються Вашим ботом</p>
        </div>
      </div>
    );

  return (
    <div>
      {clients.map((client) => {
        return (
          <div key={client._id}>
            <ClientCard
              id={client._id}
              name={
                client.telegramUserId?.firstName ||
                client.telegramUserId?.username
              }
              thumbnail={client.telegramUserId?.photoUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
