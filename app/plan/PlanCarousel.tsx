import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { data } from "./data";

type Props = {};

const PlanCarousel = (props: Props) => {
  return (
    <Carousel
      opts={{
        align: "start",
        // loop: true,
      }}
      className="relative w-full h-full max-w-2xl aspect-square"
    >
      <div className="flex gap-1 py-4 justify-center">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className={`h-2.5 w-4 bg-foreground transition-all ease-in-out duration-300 shrink-0 rounded-full scale`}
            style={{
              height: "0.625rem",
            }}
          ></div>
        ))}
      </div>
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="relative min-w-sm rounded-2xl bg-primary">
                <CardContent className="aspect-square flex items-center justify-center">
                  <div className="h-full w-full flex flex-col items-center justify-between text-white">
                    <div className="p-10 pb-0 flex justify-between items-center group cursor-default">
                      <div className="text-4xl font-bold text-white tracking-tight">
                        {item.day}
                      </div>
                    </div>
                    <div className="font-bold tracking-lighter">
                      <div>1. {item.workouts[1]}</div>
                      <div>2. {item.workouts[2]}</div>
                      <div>3. {item.workouts[3]}</div>
                      <div>4. {item.workouts[4]}</div>
                      <div>5. {item.workouts[5]}</div>
                      <div>6. {item.workouts[6]}</div>
                    </div>
                    <div>PooP</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PlanCarousel;
