import Plans from "@/app/components/admin/Plans";

export default function PricingPage() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Тарифні плани</h2>
      </div>
      <div className="mb-8">
        <Plans />
      </div>
    </div>
  );
}
