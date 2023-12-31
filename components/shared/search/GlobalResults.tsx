"use client";

import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/global.actions";

const GlobalResults = () => {
  const searchParams = useSearchParams();

  // Define the state for loading and search response.
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([
    { type: "question", id: 1, title: "NextJs" },
    { type: "tag", id: 1, title: "NextJs" },
    { type: "user", id: 1, title: "Paul" },
  ]);

  // Extract relevant search parameters for global search
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  // Effect hook to fetch the search results based on the search parameters
  useEffect(() => {
    const fetchResult = async () => {
      // Clear previous results and set loading state
      setResponse([]);
      setIsLoading(true);
      try {
        // fetch the response from the search result from the database and parse them
        const res = await globalSearch({ query: global, type });
        setResponse(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false); // Reset the loading state
      }
    };
    // Trigger fetching if there's a global search value
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  // Utility function to determine the URL based on result type
  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
        break;
      case "answer":
        return `/question/${id}`;
        break;
      case "user":
        return `/profile/${id}`;
        break;
      case "tag":
        return `/tags/${id}`;
        break;

      default:
        return "/";
    }
  };

  return (
    <div
      className="absolute top-full z-10 mt-3 w-full bg-light-800
     px-5 shadow-sm dark:bg-dark-400 rounded-xl"
    >
      {/* rendering the globalFilter */}
      <GlobalFilters />

      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {/* Loading state display */}
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className=" my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {response.length > 0 ? (
              // Display each search result
              response.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 
                  hover:bg-light-700/50 dark:bg-dark500/50 "
                >
                  <Image
                    src="/assets/icons/tag.png"
                    alt="tags"
                    width={25}
                    height={14}
                    className=" object-contain mt-1 mb-1"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 mt-1 line-clamp">
                      {item.title}
                    </p>
                    <p className="text-light400-light500 small-medium  font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              // Display if no results were found
              <div className=" flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResults;
