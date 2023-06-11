import { createPhoto } from "@/utils/helpers";
import { HeroHome, GridTwo } from "@/components/home";

export default function Home() {
  return (
    <main className="relative flex flex-col gap-10">
      <HeroHome />
      <GridTwo
        firstPhoto={createPhoto("/assets/photos/house_home.webp")}
        secondPhoto={createPhoto("/assets/photos/house_home.webp")}
      />
    </main>
  );
}
