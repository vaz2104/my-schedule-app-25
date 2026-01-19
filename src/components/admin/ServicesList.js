import NoServicesList from "./NoServicesList";
import ServiceCard from "./ServiceCard";

export default function ServicesList({ updateListHandler, services }) {
  if (!services?.length) return <NoServicesList />;

  return (
    <div className="border-t border-gray-200">
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
            />
          </div>
        );
      })}
    </div>
  );
}
