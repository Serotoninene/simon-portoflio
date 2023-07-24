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

const photos = [
  {
    ...createPhoto("/assets/photos/01_MY_GARDEN_IS_COOL.jpeg"),
    caption: {
      idx: "1",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg"),
    caption: {
      idx: "2",
      title: "MY HOUSE IS A TRIANGLE",
      place: "Vancouver (CA)",
      date: "2020",
    },
  },

  {
    ...createPhoto("/assets/photos/03_GOOGLE_MAPS-ING.jpeg"),
    caption: {
      idx: "3",
      title: "GOOGLE MAPS-ING",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/04_FISHING.jpeg"),
    caption: {
      idx: "4",
      title: "FISHING",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/05_LIVING_ON_A_BOAT.jpeg"),
    caption: {
      idx: "5",
      title: "LIVING ON A BOAT",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
];

export default function Home() {
  const photo = {
    ...createPhoto("/assets/photos/house_home.webp"),
    caption: {
      idx: "9",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  };
  return (
    <Container className="pt-6">
      <main className="relative flex flex-col gap-56 pb-40">
        <HeroHome />
        <GridTwo firstPhoto={photos[0]} secondPhoto={photos[1]} />
        <OneWCaption photo={photos[2]}>
          <>
            <span className="font-bold">Tourists taking a break from</span> the
            rain close by the genuine{" "}
            <span className="font-bold">pink building</span>.
          </>
        </OneWCaption>
        <GridThree
          firstPhoto={photos[3]}
          secondPhoto={photos[4]}
          thirdPhoto={photos[5]}
        />
        <OneCentered photo={photos[6]} />
        <OneCentered photo={photos[7]} />
        <TwoShifted firstPhoto={photos[8]} secondPhoto={photos[9]} />
        <TwoShifted firstPhoto={photos[10]} secondPhoto={photos[11]} inverted />
        <OneWoCaption photo={photos[12]} />
        <GridThree
          firstPhoto={photos[13]}
          secondPhoto={photos[14]}
          thirdPhoto={photos[15]}
          inverted
        />
        <GridThree
          firstPhoto={photos[16]}
          secondPhoto={photos[17]}
          thirdPhoto={photos[18]}
        />
        <GridTwo firstPhoto={photos[19]} secondPhoto={photos[20]} />
        <OneWCaption photo={photos[21]}>
          <>
            <span className="font-bold">The couch</span> waits all day for you{" "}
            <span className="font-bold">to come home</span>.
          </>
        </OneWCaption>
        <TwoShifted firstPhoto={photos[22]} secondPhoto={photos[23]} inverted />
        <TwoShifted firstPhoto={photos[24]} secondPhoto={photos[25]} />
        <TwoShifted firstPhoto={photos[26]} secondPhoto={photos[27]} inverted />
        <GridTwo firstPhoto={photos[28]} secondPhoto={photos[29]} />
        <ThreeAlined
          firstPhoto={photos[30]}
          secondPhoto={photos[31]}
          thirdPhoto={photos[32]}
        />
      </main>
    </Container>
  );
}
