import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community | XMe",
  description:
    "XMe is a platform where professionals from diverse fields share their expertise,answer questions, and engage with a curious audience.",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  // Fetch all users based on the search query or filter provided in the 'searchParams'.
  const response = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {/* page header */}
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      {/* Render the search bar and filter components */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
          placeholder="Search for users"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* Display the user cards, or a message if there are no users. 
      conditional rendering */}
      <section className="mt-12 flex flex-wrap gap-4">
        {response.users.length > 0 ? (
          response.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>Not User Yet</p>
            <Link href="/sign-up" className="mt-3 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={(response as any).isNext}
        />
      </div>
    </>
  );
};

export default Page;
