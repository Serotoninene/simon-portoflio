import { createPhoto } from "@/utils/helpers";
import { HeroHome, GridTwo, OneWCaption, GridThree } from "@/components/home";

export default function Home() {
  return (
    <main className="relative flex flex-col gap-56">
      <HeroHome />
      <GridTwo
        firstPhoto={createPhoto("/assets/photos/house_home.webp")}
        secondPhoto={createPhoto("/assets/photos/house_home.webp")}
      />
      <OneWCaption photo={createPhoto("/assets/photos/house_home.webp")}>
        <>
          <span className="font-bold">Tourists taking a break from</span> the
          rain close by the genuine{" "}
          <span className="font-bold">pink building</span>.
        </>
      </OneWCaption>
      <GridThree
        firstPhoto={createPhoto("/assets/photos/house_home.webp")}
        secondPhoto={createPhoto("/assets/photos/house_home.webp")}
        thirdPhoto={createPhoto("/assets/photos/house_home.webp")}
      />
    </main>
  );
}
