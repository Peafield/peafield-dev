import DarkModeToggle from "@/components/buttons/DarkModeToggle";

export default function Home() {
  return (
    <main>
      <DarkModeToggle />
      <h1 className="font-openSans  text-black dark:text-textDark">
        Coming Soon!
      </h1>
    </main>
  );
}
