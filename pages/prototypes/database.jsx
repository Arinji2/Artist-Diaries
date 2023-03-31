import { useUser } from "@clerk/nextjs";
import { supabase } from "../../utils/supabaseClient";

function Page({ countries }) {
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
      <button
        className="w-32 h-32 bg-red-500"
        onClick={() => {
          console.log("Runs");
          supabase
            .from("artists")
            .insert({
              name: "test",
              email: "test@gmail.com",
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      ></button>
    </div>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("artists").select();

  return {
    props: {
      countries: data,
    },
  };
}

export default Page;
