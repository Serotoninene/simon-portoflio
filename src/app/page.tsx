import { createPhoto } from "@/utils/helpers";
import { HeroHome, GridTwo, OneWCaption } from "@/components/home";

export default function Home() {
  return (
    <main className="relative flex flex-col gap-56">
      <HeroHome />
      <GridTwo
        firstPhoto={createPhoto("/assets/photos/house_home.webp")}
        secondPhoto={createPhoto("/assets/photos/house_home.webp")}
      />
      <OneWCaption />
    </main>
  );
}
