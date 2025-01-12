import Link from "next/link";
import DarkModeToggle from "./buttons/DarkModeToggle";

const Navbar = () => {
  const navLinks = [
    { id: 1, text: "Blog", path: "/blog" },
    { id: 2, text: "Portfolio", path: "/portfolio" },
    { id: 3, text: "Contact", path: "/contact" },
  ];
  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Home */}
        <div>
          <Link
            href="/"
            className="font-openSans font-bold text-black dark:text-white"
          >
            Peafield.dev
          </Link>
        </div>
        {/* Nav links */}
        <div>
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className="font-openSans font-medium text-black dark:text-white"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Socials and utils */}
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
