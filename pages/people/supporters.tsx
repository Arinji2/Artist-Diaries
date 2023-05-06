import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import type { NextPage } from "next";
import Card from "@/components/People/Card";
import Link from "next/link";
import type { Artist } from "@/utils/types";
import {
  fetchPaginatedData,
  fetchStaticPaginatedData,
} from "@/utils/fetchFunc";
const Supporters: NextPage<any> = ({ serverRes }) => {
  useEffect(() => {}, []);
  const [data, setData] = useState<Artist[]>([...serverRes]);
  const [offset, setOffset] = useState<number>(3);
  const [end, setEnd] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>(false);
  const endOfPageRef = useRef(null);
  const intersection = useIntersection(endOfPageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const tableName = "supporters";
  async function fetchData() {
    setFetching(true);
    const res = await fetchPaginatedData(tableName, offset);

    res.forEach((item: any) => {
      if (item.name !== null) {
        setData((prevData) => [...prevData, item]);
      }
    });
    setOffset((prevOffset) => prevOffset + 5);

    setFetching(false);

    if (res.length == 0) {
      setEnd(true);
    }
  }

  useEffect(() => {
    if (intersection && intersection.isIntersecting && !fetching) {
      if (!end) fetchData();
    }
  }, [intersection, fetching, end]);

  return (
    <div className="min-h-[100svh] h-fit w-full flex flex-col items-center justify-center text-black bg-[#D9D9D9]">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-32">
        Supporters
      </h1>

      <div className="w-full h-full flex flex-row flex-wrap items-center justify-center gap-2 ">
        {data.map((item) => (
          <Link
            className="w-fit h-fit"
            key={item.id}
            href={`/artist/view/${item.name}`}
          >
            <Card
              about={item.about}
              image={item.profile_image}
              name={item.name}
            />
          </Link>
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
  const serverRes = await fetchStaticPaginatedData("supporters", 0);
  return {
    props: {
      serverRes,
    },
    revalidate: 1000,
  };
}

export default Supporters;
