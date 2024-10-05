import Store from "@/components/Store";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center mt-10">
      <h1 className="text-3xl uppercase" >Store</h1>
      <Store />
    
    </div>
  );
}
