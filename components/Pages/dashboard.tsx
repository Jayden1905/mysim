"use client";

import { formatCompactNumber } from "@/lib/utils";
import userStatisticsData from "@/public/lottie/user_statistics.json";
import Lottie from "lottie-react";
import { AiOutlineStar } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { AspectRatio } from "../ui/aspect-ratio";
import { DashboardHomeProps } from "./types";

export default function DashbaordHome({ team, userCount }: DashboardHomeProps) {
  const popularityRate = (userCount / 1000000) * 100;

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 text-white md:grid-cols-2 lg:grid-cols-3">
        <div className="flex justify-between rounded-lg bg-gradient-to-r from-accent to-[#9678f0] px-4 pb-4 pt-10 lg:col-span-2 lg:px-14">
          <div className="flex flex-col gap-2">
            <p className="lg:tracking-wide">Users for today</p>
            <h1 className="text-4xl tracking-wider md:mb-7 lg:text-8xl">
              {formatCompactNumber(userCount)}
            </h1>
            <div className="flex flex-col gap-3 lg:gap-6">
              <div className="flex gap-5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[rgba(255,255,255,0.3)] lg:h-10 lg:w-10">
                  <AiOutlineStar className="lg:h-5 lg:w-5" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-thin tracking-wider">Popularity</p>
                  <p className="lg:text-xl">
                    {formatCompactNumber(popularityRate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[rgba(255,255,255,0.3)] lg:h-10 lg:w-10">
                  <BsGraphUpArrow className="lg:h-5 lg:w-5" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-thin tracking-wider">General</p>
                  <p className="lg:text-xl">{4.7}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[200px] md:w-[250px] lg:w-[330px]">
            <AspectRatio ratio={3 / 3}>
              <Lottie
                className="aspect-[1/1]"
                loop={false}
                animationData={userStatisticsData}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="rounded-lg bg-[#9678f0] px-4 pb-4 pt-10">heyy</div>
      </div>
      {team.map((member) => (
        <div key={member.id}>
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  );
}
