import Image from "next/image";
import Link from "next/link";
import Navigation from "./_components/Navigation";
import Counter from "./_components/counter";

import bg from "@/public/bg.png"; // use this if dont want to set certain width and height for responsive page
export default function Page() {
  return (
    <main className="mt-24 flex flex-col justify-center items-center">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
