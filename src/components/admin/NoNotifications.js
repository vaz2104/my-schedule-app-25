import Image from "next/image";
import poster from "/public/no-notifications.svg";

export default function NoNotifications() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex justify-center">
        <Image src={poster} alt="my icon" width={320} height={320} />
      </div>

      <p className="my-8 text-lg">Події відсутні!</p>
    </div>
  );
}
