/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import type { NextPage } from "next";
import { Card } from "@/components/topics/Card";
import type { Image } from "@/utils/types";
import {
  fetchPaginatedData,
  fetchStaticPaginatedData,
} from "@/utils/fetchFunc";

const Page: NextPage<any> = ({ serverRes }) => {
  const [data, setData] = useState<Image[]>([...serverRes]);
  const [offset, setOffset] = useState<number>(5);
  const [end, setEnd] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>(false);
  const endOfPageRef = useRef(null);
  const intersection = useIntersection(endOfPageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  async function fetchData() {
    setFetching(true);
    const res = await fetch(
      `/api/supabase/fetch/paginatedTableFetch?table=${"modern"}&offset=${offset}`
    );
    var newData = await res.json();
    setData((prevData) => [...prevData, ...newData]);
    setOffset((prevOffset) => prevOffset + 5);

    setFetching(false);

    if (newData.length == 0) {
      setEnd(true);
    }
  }

  useEffect(() => {
    if (intersection && intersection.isIntersecting && !fetching) {
      if (!end) fetchData();
    }
  }, [intersection, fetching, end, fetchData]);

  return (
    <div className="min-h-[100svh] h-fit w-full flex flex-col items-center justify-center text-black bg-[#D9D9D9]">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-32">
        Modern
      </h1>

      <div className="w-full h-full flex flex-row flex-wrap items-center justify-center gap-2 ">
        {data.map((item) => (
          <Card key={item.uid} item={item} tableName={"modern"} />
        ))}
      </div>
      <div ref={endOfPageRef}>
        <p className="text-3xl font-righteous text-[#960226]">
          {end ? "End of Page" : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const serverRes = await fetchStaticPaginatedData("modern", "0");
  return {
    props: {
      serverRes,
    },
  };
}

export default Page;
