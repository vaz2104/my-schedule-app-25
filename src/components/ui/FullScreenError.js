export default function FullScreenError({ errorMessage }) {
  return (
    <div className="ms-full-creen flex justify-center items-center">
      <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-100  dark:text-red-400">
        <div className="ms-3 text-sm font-medium">{errorMessage}</div>
      </div>
    </div>
  );
}
