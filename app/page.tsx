import CarouselCards from "./components/carouselCards";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 w-full p-5 flex justify-center">
        <CarouselCards />
      </div>
    </main>
  );
}
