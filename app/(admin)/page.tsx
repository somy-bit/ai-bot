import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white w-full rouneded-md">
       <h1 className="text-4xl font-light">
        Welcome to {"  "}
        <span className="text-[#64b5f5] font-semibold">Assistly</span>
       </h1>
       <h2 className="mt-2 mb-10">
        your customizable AI chat agent that helps manage your customers
       </h2>

       <Link href='/create-chatbot'>
       <Button className="bg-[#64b5f5]">
        Lets get started by creating your first chatbot
       </Button>
       </Link>
    </main>
  );
}
