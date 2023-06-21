/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { generatePagination } from "@/library/generatePagination";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  onChange: (page: number) => void;
  end?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  onChange,
  end,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [page, setPage] = useState<number>(1);

  const prevHandler = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
    onChange(page - 1);
  };

  const nextHandler = () => {
    if (page === totalPages) return;
    setPage((prevPage) => prevPage + 1);
    onChange(page + 1);
  };

  return (
    <div className="w-full flex justify-end items-center text-sm font-medium mt-4 mb-6 text-tertiary_light_color">
      <p className="mr-3 text-[1.5rem] text-tertiary_color tracking-wider">
        Showing {page} results of {totalPages}
      </p>
      <div className="flex items-center">
        <MdKeyboardArrowLeft
          onClick={prevHandler}
          className={`h-14 w-14 cursor-pointer fill-primary_color ${
            page === 1 && "cursor-not-allowed fill-primary_light_color"
          }`}
        />
        {generatePagination(page, totalPages).map((each: string | number) => (
          <p
            key={each}
            onClick={() => {
              onChange(+each);
              setPage(+each);
            }}
            className={`px-2 text-[1.7rem] cursor-pointer ${
              page === each ? "text-primary_dark_color font-bold" : ""
            }`}
          >
            {each}
          </p>
        ))}
        <MdKeyboardArrowRight
          onClick={nextHandler}
          className={`h-14 w-14 cursor-pointer fill-primary_color ${
            page === totalPages || totalPages < 1
              ? "cursor-not-allowed fill-primary_light_color"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
