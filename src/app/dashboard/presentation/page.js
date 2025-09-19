import Presentation from "@/components/general/Presentation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center align-middle">
      <Presentation />
      <div className="text-center p-4">
        <div className="flex justify-center w-full mt-6">
          <div className="w-full animate__animated animate__slideInUp">
            <Link href="/dashboard" className="button m-auto">
              Розпочати
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
