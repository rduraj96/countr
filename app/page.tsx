import Image from "next/image";
import CarouselCards from "./components/carouselCards";
import { ModeToggle } from "./components/togglleButton";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-background">
      <div className="p-12 pb-0 w-full flex justify-between items-center">
        {/* <Image src={"/logo.svg"} alt="logo" height={60} width={60} /> */}
        <div className="flex cursor-pointer">
          <span className="text-primary text-5xl font-extrabold hover:animate-spin">
            +
          </span>
          <span className="text-6xl font-black text-black dark:text-white">
            R
          </span>
        </div>
        <ModeToggle />
      </div>
      <div className="flex-1 w-full p-5 flex justify-center">
        <CarouselCards />
      </div>
    </main>
  );
}
