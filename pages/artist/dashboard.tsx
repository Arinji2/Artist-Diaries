interface CardProps {
  title: string;
  image: string;
}
function Dashboard() {
  return (
    <div className="w-full min-h-[100svh] h-fit ">
      <div className="mt-36"></div>
      <div className="flex flex-row items-center justify-evenly gap-5 flex-wrap">
        <Card title="Create a new NFT" image="/setup.jpg" />
      </div>
    </div>
  );
}

const Card = ({ title, image }: CardProps) => {
  return <div className="w-[250px] h-[450px] bg-black"></div>;
};

export default Dashboard;
