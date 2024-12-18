import Level_List from "@/components/Level_List";
export default function Home() {
  return (
    <main className="">
      <h2 className="text-center mt-20 text-4xl font-bold">Choose a level</h2>
      <Level_List />
      <div className="flex justify-center mt-10"></div>
    </main>
  );
}
