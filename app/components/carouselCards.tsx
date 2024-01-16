"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CopyPlus,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Settings2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {};

interface CarouselItem {
  title: string;
  number: number;
}

const CarouselCards = (props: Props) => {
  const [itemList, setItemList] = useState<CarouselItem[] | []>([
    {
      title: "Push Ups",
      number: 0,
    },
  ]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    api.on("slidesChanged", () => {
      api.scrollTo(count - 1);
    });
  }, [api, count]);

  const addItemHandler = () => {
    setItemList([
      ...itemList,
      {
        title: "Add Title",
        number: 0,
      },
    ]);
    setCount((prev) => prev + 1);
  };

  const increaseCounter = (index: number) => {
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.number = newItem.number + 1;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  const decreaseCounter = (index: number) => {
    if (itemList[index].number === 0) return;
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.number = newItem.number - 1;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  const resetCounter = (index: number) => {
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.number = 0;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  return (
    <Carousel
      opts={{
        align: "start",
        // loop: true,
      }}
      setApi={setApi}
      className="relative w-full h-full max-w-2xl aspect-square"
    >
      <div className="flex gap-1 py-4 justify-center">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`h-2.5 ${
              index + 1 === current ? "w-4 bg-foreground" : "w-2.5 bg-secondary"
            } transition-all ease-in-out duration-300 shrink-0 rounded-full scale`}
            style={{
              // backgroundColor: index + 1 === current ? "white" : "gray",
              height: "0.625rem",
            }}
          ></div>
        ))}
      </div>
      <CarouselContent>
        {itemList.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="relative bg-primary min-w-sm rounded-2xl">
                {/* <CardTitle>
                  <div className="p-10 pb-0 flex justify-between items-center group cursor-default">
                    <p className="text-4xl font-bold text-white tracking-tight">
                      {item.title}
                    </p>
                    <Button
                      className="rounded-full hover:bg-transparent hover:text-black group-hover:visible invisible"
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <Pencil />
                    </Button>
                  </div>
                </CardTitle> */}
                <CardContent className="aspect-square flex items-center justify-center overflow-hidden">
                  <div className="h-full flex flex-col items-center justify-between text-white">
                    <div className="p-10 pb-0 flex justify-between items-center group cursor-default">
                      <p className="text-4xl font-bold text-white tracking-tight">
                        {item.title}
                      </p>
                      {/* <Button
                        className="rounded-full hover:bg-transparent hover:text-black group-hover:visible invisible"
                        size={"icon"}
                        variant={"ghost"}
                      >
                        <Pencil />
                      </Button> */}
                    </div>
                    <div className="font-black text-9xl text-center tracking-tighter">
                      {item.number}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-12 w-12 border-white hover:border-accent bg-transparent shrink-0 rounded-full"
                        onClick={() => resetCounter(index)}
                      >
                        <RotateCcw />
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        className="h-14 w-14 border-white hover:border-accent bg-transparent shrink-0 rounded-full"
                        onClick={() => decreaseCounter(index)}
                      >
                        <Minus />
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        className="h-14 w-14 border-white hover:border-accent bg-transparent shrink-0 rounded-full"
                        onClick={() => increaseCounter(index)}
                      >
                        <Plus />
                      </Button>
                      <Popover>
                        <PopoverTrigger>
                          {" "}
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-12 w-12 border-white hover:border-accent bg-transparent shrink-0 rounded-full"
                            // onClick={() => increaseCounter(index)}
                          >
                            <Settings2 />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" sideOffset={10}>
                          <div>
                            <p className="p-1">Color</p>
                            <div className="p-1 flex items-center space-x-3">
                              <div className="h-5 w-5 shrink-0 bg-primary ring-2 ring-offset-2 ring-offset-background ring-primary rounded-full"></div>
                              <div className="h-5 w-5 shrink-0 bg-blue-600 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-blue-600"></div>
                              <div className="h-5 w-5 shrink-0 bg-green-600 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-green-600"></div>
                              <div className="h-5 w-5 shrink-0 bg-yellow-600 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-yellow-600"></div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="pt-4 flex justify-center
      "
      >
        <Button
          variant={"secondary"}
          onClick={() => {
            addItemHandler();
            api.scrollNext();
          }}
          className="absolute bottom-10 h-12 w-12 rounded-full"
        >
          <CopyPlus />
        </Button>
      </div>

      {/* {itemList.length !== 0 && <CarouselPrevious />}
      {itemList.length !== 0 && <CarouselNext />} */}
    </Carousel>
  );
};

export default CarouselCards;
