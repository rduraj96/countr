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
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

type Props = {};

interface CarouselItem {
  title: string;
  number: number;
  color: string;
  incrementValue: number;
  decrementValue: number;
}

const CarouselCards = (props: Props) => {
  const [itemList, setItemList] = useState<CarouselItem[] | []>([
    {
      title: "Title",
      number: 0,
      color: "#dc2626",
      incrementValue: 1,
      decrementValue: 1,
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
      api.scrollTo(api.scrollSnapList().length);
      // api.scrollTo(api.previousScrollSnap());
    });
  }, [api]);

  const addItemHandler = () => {
    setItemList([
      ...itemList,
      {
        title: "Add Title",
        number: 0,
        color: "#dc2626",
        incrementValue: 1,
        decrementValue: 1,
      },
    ]);
    setCount((prev) => prev + 1);
  };

  const removeItemHandler = () => {
    if (itemList) {
      setItemList((itemList) =>
        itemList.filter((_, index) => index !== current - 1)
      );
    }
  };

  const colorHandler = (color: string, index: number) => {
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.color = color;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  const titleHandler = (title: string, index: number) => {
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.title = title;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  const increaseCounter = (index: number) => {
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.number = newItem.number + newItem.incrementValue;
    newItemList[index] = newItem;
    setItemList(newItemList);
  };

  const decreaseCounter = (index: number) => {
    if (itemList[index].number === 0) return;
    let newItemList = [...itemList];
    let newItem = { ...newItemList[index] };
    newItem.number = newItem.number - newItem.decrementValue;
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
        {Array.from({ length: itemList.length }).map((_, index) => (
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
              <Card
                className={`"relative min-w-sm rounded-2xl"`}
                style={{
                  backgroundColor: item.color,
                }}
              >
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
                      <div
                        contentEditable="true"
                        onChange={(e) =>
                          titleHandler(e.currentTarget.innerText, index)
                        }
                        className="text-4xl font-bold text-white tracking-tight"
                      >
                        {item.title}
                      </div>
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
                          <div className="space-y-3">
                            <div className="flex items-center justify-between space-x-2">
                              <Label className="p-1">Color</Label>
                              <RadioGroup
                                onValueChange={(color) =>
                                  colorHandler(color, index)
                                }
                                value={item.color}
                              >
                                <div className="flex items-center space-x-3 px-1">
                                  <RadioGroupItem
                                    value="#dc2626"
                                    id="red"
                                    className="bg-primary border-none"
                                  />
                                  <RadioGroupItem
                                    value="#2563eb"
                                    id="blue"
                                    className="bg-card-blue border-none"
                                  />
                                  <RadioGroupItem
                                    value="#16a34a"
                                    id="green"
                                    className="bg-card-green border-none"
                                  />
                                  <RadioGroupItem
                                    value="#eab308"
                                    id="yellow"
                                    className="bg-card-yellow border-none"
                                  />
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center justify-between space-x-3 px-1">
                              <Label className="whitespace-nowrap">
                                <b>+</b> Value
                              </Label>
                              <Input
                                type="number"
                                value={item.incrementValue}
                                onChange={(e) => {
                                  let newItemList = [...itemList];
                                  let newItem = { ...newItemList[index] };
                                  newItem.incrementValue = Number(
                                    e.currentTarget.value
                                  );
                                  newItemList[index] = newItem;
                                  setItemList(newItemList);
                                }}
                                className="w-20 text-end"
                              />
                            </div>
                            <div className="flex items-center justify-between space-x-3 px-1">
                              <Label className="whitespace-nowrap">
                                <b>-</b> Value
                              </Label>
                              <Input
                                type="number"
                                value={item.decrementValue}
                                onChange={(e) => {
                                  let newItemList = [...itemList];
                                  let newItem = { ...newItemList[index] };
                                  newItem.decrementValue = Number(
                                    e.currentTarget.value
                                  );
                                  newItemList[index] = newItem;
                                  setItemList(newItemList);
                                }}
                                className="w-20 text-end"
                              />
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
        <div className="absolute bottom-10 flex space-x-4">
          <Button
            variant={"destructive"}
            disabled={count === 1}
            onClick={() => {
              removeItemHandler();
            }}
            className="h-12 w-12 rounded-full"
          >
            <X />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              addItemHandler();
            }}
            className="h-12 w-12 rounded-full"
          >
            <CopyPlus />
          </Button>
        </div>
      </div>

      {/* {itemList.length !== 0 && <CarouselPrevious />}
      {itemList.length !== 0 && <CarouselNext />} */}
    </Carousel>
  );
};

export default CarouselCards;
