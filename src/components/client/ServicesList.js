import NoServices from "./NoServices";
import ServiceCard from "./ServiceCard";

export default function ServicesList({ updateListHandler, services }) {
  if (!services?.length) return <NoServices />;

  return (
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
