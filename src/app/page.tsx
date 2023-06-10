import Image from "next/image";
import { spartan } from "./layout";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="h-screen relative">
        <Image
          alt="house in a green field"
          src="/assets/photos/house_home.webp"
          fill
          objectFit="cover"
        />
      </div>
      <h1 className={spartan.className}>Simon Eychenne</h1>
    </main>
  );
}
