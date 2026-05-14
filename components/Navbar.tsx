export default function Navbar() {
  return (
    <div className="w-full backdrop-blur-xl bg-white/60 border-b border-white/40 px-6 py-4 shadow-sm flex items-center justify-between">
      
      <h2 className="text-xl font-bold">
        🍴 FoodieFeed
      </h2>

      <div className="flex gap-6 text-sm text-gray-700">
        <a className="hover:text-blue-600">Home</a>
        <a className="hover:text-blue-600">Restaurants</a>
        <a className="hover:text-blue-600">About</a>
      </div>

    </div>
  );
}