import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import React from "react";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import QuestionCard from "@/components/cards/QuestionCard";
import { URLProps } from "@/types";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags_details | XMe",
  description:
    "XMe is a platform where professionals from diverse fields share their expertise,answer questions, and engage with a curious audience.",
};
const Page = async ({ params, searchParams }: URLProps) => {
  const response = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{response.tagTitle}</h1>

      {/* localsearch */}
      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.png"
          otherClasses="flex-1"
          placeholder="Search for tag questions"
        />
      </div>

      {/* displaying the saved questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {response.questions.length > 0 ? (
          response.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no tag questions to show"
            description="Don't hesitate to ask questions – whether it's about a skill you're
          eager to master, an experience you'd like to share, or an event you'd
          like to see!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={response.isNext}
        />
      </div>
    </>
  );
};

export default Page;
