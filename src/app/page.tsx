import { createPhoto } from "@/utils/helpers";
import {
  HeroHome,
  GridTwo,
  OneWCaption,
  GridThree,
  OneCentered,
  TwoShifted,
  ThreeAlined,
} from "@/components/home";
import { OneWoCaption } from "@/components/home/OneWoCaption";
import { Container } from "@/components/molecules";

// TO DO
// [X] Make animations for the vignettes
// [X] Insert Simon's logo as a favicon
// [X] Finish to integrate the maquette
// [X] Make it all responsive
// [X] start working on the layout of the work

export default function Home() {
  const photo = {
    ...createPhoto("/assets/photos/house_home.webp"),
    caption: {
      idx: "1",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  };
  return (
    <Container className="pt-6">
      <main className="relative flex flex-col gap-56 pb-40">
        <HeroHome />
        <GridTwo firstPhoto={photo} secondPhoto={photo} />
        <OneWCaption photo={photo}>
          <>
            <span className="font-bold">Tourists taking a break from</span> the
            rain close by the genuine{" "}
            <span className="font-bold">pink building</span>.
          </>
        </OneWCaption>
        <GridThree firstPhoto={photo} secondPhoto={photo} thirdPhoto={photo} />
        <OneCentered photo={photo} />
        <OneCentered photo={photo} />
        <TwoShifted firstPhoto={photo} secondPhoto={photo} />
        <TwoShifted firstPhoto={photo} secondPhoto={photo} inverted />
        <OneWoCaption photo={photo} />
        <GridThree
          firstPhoto={photo}
          secondPhoto={photo}
          thirdPhoto={photo}
          inverted
        />
        <GridThree firstPhoto={photo} secondPhoto={photo} thirdPhoto={photo} />
        <GridTwo firstPhoto={photo} secondPhoto={photo} />
        <OneWCaption photo={photo}>
          <>
            <span className="font-bold">The couch</span> waits all day for you{" "}
            <span className="font-bold">to come home</span>.
          </>
        </OneWCaption>
        <TwoShifted firstPhoto={photo} secondPhoto={photo} inverted />
        <TwoShifted firstPhoto={photo} secondPhoto={photo} />
        <TwoShifted firstPhoto={photo} secondPhoto={photo} inverted />
        <GridTwo firstPhoto={photo} secondPhoto={photo} />
        <ThreeAlined
          firstPhoto={photo}
          secondPhoto={photo}
          thirdPhoto={photo}
        />
      </main>
    </Container>
  );
}
