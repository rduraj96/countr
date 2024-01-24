import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "../components/Navbar";
import PlanCarousel from "./PlanCarousel";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 w-full p-5 flex justify-center">
        <PlanCarousel />
      </div>
    </div>
  );
};

export default page;
