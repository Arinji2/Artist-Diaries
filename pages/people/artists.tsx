import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import type { NextPage } from "next";
import Card from "@/components/People/Card";
import Link from "next/link";

export interface Artist {
  id: number;
  user_id: string;
  name: string;
  email: string;
  images: Image[];
  favorites: Image[];
  about: string;
  profile_image: string;
}

interface Image {
  uid: number;
  name: string;
  location: string;
  artist: number;
  likes: number;
  description: string;
}
const Artists: NextPage<any> = ({ serverRes }) => {
  useEffect(() => {
    console.log(serverRes);
  }, []);
  const [data, setData] = useState<Artist[]>([...serverRes]);
  const [offset, setOffset] = useState<number>(5);
  const [end, setEnd] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>(false);
  const endOfPageRef = useRef(null);
  const intersection = useIntersection(endOfPageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const tableName = "artists";
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
      if (!end) fetchData();
    }
  }, [intersection, fetching, end]);

  return (
    <div className="min-h-[100svh] h-fit w-full flex flex-col items-center justify-center text-black bg-[#D9D9D9]">
      <h1 className="text-[60px] md:text-[70px] font-righteous text-[#960226] mt-32">
        Artists
      </h1>

      <div className="w-full h-full flex flex-row flex-wrap items-center justify-center gap-2 ">
        {data.map((item) => (
          <Link className="w-fit h-fit" href={`/artist/view/${item.name}`}>
            <Card
              key={item.id}
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

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/fetchTopics?table=artists&offset=0`
  );
  const serverRes: Item = await res.json();
  return {
    props: {
      serverRes,
    },
  };
}

export default Artists;
