// components/Header.js
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function Header({ currentUser }) {
  // const { currentUser, loading } = useUser();

  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/login" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Link
          key={href}
          href={href}
          className="text-gray-600 hover:text-blue-600"
        >
          {label}
        </Link>
      );
    });

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-70 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Microservices App
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">{links}</nav>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for mobile menu (e.g., hamburger icon) */}
              &#9776;
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
