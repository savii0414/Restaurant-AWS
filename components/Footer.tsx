export default function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500 border-t border-white/40 pt-6">
      <p>© {new Date().getFullYear()} 🍽️ FoodieFeed</p>
      <p className="mt-1">Made using Next.js</p>
    </footer>
  );
}