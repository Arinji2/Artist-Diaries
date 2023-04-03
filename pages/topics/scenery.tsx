import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import type { NextPage } from "next";
import { Card } from "@/components/topics/Card";

interface Item {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}

const Scenery: NextPage<any> = ({ serverRes }) => {
  const [data, setData] = useState<Item[]>([...serverRes]);
  const [offset, setOffset] = useState<number>(5);
  const [end, setEnd] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>(false);
  const endOfPageRef = useRef(null);
  const intersection = useIntersection(endOfPageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const tableName = "scenery";
  async function fetchData() {
    setFetching(true);
    const res = await fetch(
      `/api/fetchTopics?table=${tableName}&offset=${offset}`
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
      fetchData();
    }
  }, [intersection]);

  return (
    <div className="min-h-[100svh] h-fit w-full flex flex-col items-center justify-center text-black bg-[#D9D9D9]">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-16">
        Scenery
      </h1>

      <div className="w-full h-full flex flex-row flex-wrap items-center justify-evenly gap-5">
        {data.map((item) => (
          <Card key={item.uid} item={item} tableName={tableName} />
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

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.API_DOMAIN}/api/fetchTopics?table=scenery&offset=0`
  );
  const serverRes: Item = await res.json();
  return {
    props: {
      serverRes,
    },
  };
}

export default Scenery;
