import Spinner from "../ui/Spinner";
import ClientCard from "./ClientCard";

export default function ClientsList({ isLoading, clients }) {
  if (!clients?.length)
    return (
      <div className="relative p-4">
        {isLoading && (
          <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
            <Spinner />
          </div>
        )}
        <div className="text-center text-gray-400 mt-4">
          <p>У Вас поки немає клієнтів, що користуються Вашим ботом</p>
        </div>
      </div>
    );

  return (
    <div className="relative">
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      {clients.map((client) => {
        return (
          <div key={client?.clientId?._id}>
            <ClientCard
              id={client?.clientId?._id}
              name={client.clientId?.firstName || client.clientId?.username}
              thumbnail={client.clientId?.photoUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
