import ServiceCard from "./ServiceCard";

export default function ServicesList({ updateListHandler, services }) {
  if (!services?.length)
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-16">
          <p>У Вас поки немає доданих послуг</p>
        </div>
      </div>
    );

  return (
    // border-t border-gray-200
    <div className="">
      {services.map((service) => {
        return (
          <div key={service._id}>
            <ServiceCard
              service={service?.service}
              price={service?.price}
              priceWithSale={service?.priceWithSale}
              saleEndDay={service?.saleEndDay}
              updateListHandler={updateListHandler}
              id={service._id}
              mapItem={service}
            />
          </div>
        );
      })}
    </div>
  );
}
