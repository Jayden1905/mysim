"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Button } from "../ui/button";

type Props = {
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export function AdminBlogheader(props: Props) {
  const [searchBtnOpen, setSearchBtnOpen] = useState(false);
  const searchBtnRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (
      searchBtnRef.current &&
      !searchBtnRef.current.contains(event.target as Node)
    ) {
      setSearchBtnOpen(false);
    }
  }

  useEffect(() => {
    if (searchBtnOpen) {
      setTimeout(() => {
        props.searchInputRef.current?.focus();
      }, 300);
    } else {
      props.searchInputRef.current?.blur();
    }

    // check if anything outside of the search button is clicked
    document.addEventListener("mousedown", handleClickOutside);
  }, [props.searchInputRef, searchBtnOpen]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Link scroll={false} href={"/dashboard/blog/create-blog"}>
          <Button>
            New Post
            <AiOutlinePlus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex relative items-center justify-center">
        <div
          ref={searchBtnRef}
          onClick={() => setSearchBtnOpen(!searchBtnOpen)}
          className={`absolute ${searchBtnOpen ? "right-[85%]" : ""}`}
        >
          <BsSearch className={`z-10 h-5 w-5 cursor-pointer`} />
        </div>
        <input
          disabled={!searchBtnOpen}
          className={`${
            searchBtnOpen ? "w-52 px-10" : "w-10 px-0"
          } h-10 rounded-full bg-gray-200 dark:bg-black outline-none transition-all duration-300 ease-in-out`}
          ref={props.searchInputRef}
        />
      </div>
    </div>
  );
}
