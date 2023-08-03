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
import { Container, LocomotiveScrollContainer } from "@/components/molecules";

const photos = [
  {
    ...createPhoto("/assets/photos/01_MY_GARDEN_IS_COOL.jpeg"),
    dominantColor: "#282515",
    caption: {
      idx: "1",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg"),
    dominantColor: "#a29c9d",
    caption: {
      idx: "2",
      title: "MY HOUSE IS A TRIANGLE",
      place: "Vancouver (CA)",
      date: "2020",
    },
  },

  {
    ...createPhoto("/assets/photos/03_GOOGLE_MAPS-ING.jpeg"),
    dominantColor: "#413722",

    caption: {
      idx: "3",
      title: "GOOGLE MAPS-ING",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/04_FISHING.jpeg"),
    dominantColor: "#bdbba3",
    caption: {
      idx: "4",
      title: "FISHING",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/05_LIVING_ON_A_BOAT.jpeg"),
    dominantColor: "#798d97",
    caption: {
      idx: "5",
      title: "LIVING ON A BOAT",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/06_CROWDED.jpeg"),
    dominantColor: "#a6b2bc",
    caption: {
      idx: "6",
      title: "CROWDED",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },

  {
    ...createPhoto("/assets/photos/07_SQUARED.jpeg"),
    dominantColor: "#917b5d",
    caption: {
      idx: "7",
      title: "SQUARED",
      place: "Hawaï (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/09_SUPERMARKET.jpeg"),
    dominantColor: "#9e382f",
    caption: {
      idx: "9",
      title: "SUPERMARKET",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/10_TIME_FOR_LAUNDRY.jpeg"),
    dominantColor: "#a8a4aa",
    caption: {
      idx: "10",
      title: "TIME FOR LAUNDRY",
      place: "Vancouver (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/11_APERITIF.jpeg"),
    dominantColor: "#bcb7af",
    caption: {
      idx: "11",
      title: "APERITIF",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/12_AROUND_THE_CORNER.jpeg"),
    dominantColor: "#ababa7",
    caption: {
      idx: "12",
      title: "AROUND THE CORNER",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/13_TROPICAL_CHURCH.jpeg"),
    dominantColor: "#aeaab9",
    caption: {
      idx: "13",
      title: "TROPICAL CHURCH",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/14_ROOMS_FOR_ME_&_FOR_MY_CAR.jpeg"),
    dominantColor: "#cfbaa5",
    caption: {
      idx: "14",
      title: "ROOMS FOR ME & FOR MY CAR",
      place: "Drumheller (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/15_MONUMENT.jpeg"),
    dominantColor: "#b6adb0",
    caption: {
      idx: "15",
      title: "MONUMENT",
      place: "Whitehorse (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/08_ALL_ABOUT_CLEANING.jpeg"),
    dominantColor: "#c3afa5",
    caption: {
      idx: "",
      title: "ALL ABOUT CLEANING",
      place: "Canary Islands (ES)",
      date: "2023",
    },
  },
  {
    ...createPhoto("/assets/photos/16_WHITE_IN_THE_BLUE.jpeg"),
    dominantColor: "#cabdb7",
    caption: {
      idx: "16",
      title: "WHITE IN THE BLUE",
      place: "Madrid (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/17_A_POLAR_CHURCH.jpeg"),
    dominantColor: "#262b33",
    caption: {
      idx: "17",
      title: "A POLAR CHURCH",
      place: "Yukon (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/18_A_SCHOOL_IN_COLOR.jpeg"),
    dominantColor: "#304d4e",
    caption: {
      idx: "18",
      title: "A SCHOOL IN COLOR",
      place: "Victoria (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/19_I_MISSED_THE_TRAIN.jpeg"),
    dominantColor: "#a39279",
    caption: {
      idx: "19",
      title: "I MISSED THE TRAIN",
      place: "Somewhere in Norway (NO)",
      date: "2022",
    },
  },
  {
    ...createPhoto("/assets/photos/20_LOVE_IN_A_RUBBER_BOAT.jpeg"),
    dominantColor: "#244631",
    caption: {
      idx: "20",
      title: "LOVE IN A RUBBER BOAT",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/21_LOVE_AT_THE_STREET_CORNER.jpeg"),
    dominantColor: "#a2a196",
    caption: {
      idx: "21",
      title: "LOVE AT THE STREET CORNER",
      place: "Brussels (BE)",
      date: "2022",
    },
  },
  {
    ...createPhoto("/assets/photos/22_HIDING_FROM_THE_SHADOWS.jpeg"),
    dominantColor: "#d2c6b4",
    caption: {
      idx: "22",
      title: "HIDING FROM THE SHADOWS",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/23_GOING_OUT_FOR_DINNER.jpeg"),
    dominantColor: "#789aa8",
    caption: {
      idx: "23",
      title: "GOING OUT FOR DINNER",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/24_DOWN_BY_THE_LAKE.jpeg"),
    dominantColor: "#817250",
    caption: {
      idx: "24",
      title: "DOWN BY THE LAKE",
      place: "Vancouver Island (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/25_THROUGH_THE_MIRROR.jpeg"),
    dominantColor: "#ba9a48",
    caption: {
      idx: "25",
      title: "THROUGH THE MIRROR",
      place: "Mexico City (MX)",
      date: "2019",
    },
  },
  {
    ...createPhoto("/assets/photos/26_REST_AREA.jpeg"),
    dominantColor: "#688fa1",
    caption: {
      idx: "26",
      title: "REST AREA",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/27_THE_PERFECT_FAMILY.jpeg"),
    dominantColor: "#19261d",
    caption: {
      idx: "27",
      title: "THE PERFECT FAMILY",
      place: "Lillehammer (NO)",
      date: "2022",
    },
  },
  {
    ...createPhoto("/assets/photos/28_FUMER_TUE.jpeg"),
    dominantColor: "#decfc0",
    caption: {
      idx: "28",
      title: "FUMER TUE",
      place: "Brussels (BE)",
      date: "2022",
    },
  },
  {
    ...createPhoto("/assets/photos/29_UNE_MAQUETTE.jpeg"),
    dominantColor: "#2f351c",
    caption: {
      idx: "29",
      title: "UNE MAQUETTE",
      place: "Montréal (CA)",
      date: "2019",
    },
  },
  {
    ...createPhoto("/assets/photos/30_DIVING_IN_THE_BLUE.jpeg"),
    dominantColor: "#c8c9d4",
    caption: {
      idx: "30",
      title: "DIVING IN THE BLUE",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    ...createPhoto("/assets/photos/31_STRANGER.jpeg"),
    dominantColor: "#422114",
    caption: {
      idx: "31",
      title: "STRANGER",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    ...createPhoto("/assets/photos/32_SHANGLIE.jpeg"),
    dominantColor: "#9dafa8",
    caption: {
      idx: "32",
      title: "SHANGLIE",
      place: "Vielsalm (BE)",
      date: "2022",
    },
  },
  {
    ...createPhoto("/assets/photos/33_MA_GRAND-MERE.jpeg"),
    dominantColor: "#8c543c",
    caption: {
      idx: "33",
      title: "MA GRAND-MERE",
      place: "Haute-Garonne (FR)",
      date: "2023",
    },
  },
];

photos.forEach((photo, idx) => {
  photo.caption.idx = (idx + 1).toString();
});

export default function Home() {
  return (
    <LocomotiveScrollContainer>
      <Container className="pt-6">
        <main className="relative flex flex-col gap-56 pb-6">
          <HeroHome />
          <GridTwo firstPhoto={photos[0]} secondPhoto={photos[1]} />
          <OneWCaption photo={photos[2]}>
            <>
              <span className="font-bold">Tourists taking a break from</span>{" "}
              the rain close by the genuine{" "}
              <span className="font-bold">pink building</span>.
            </>
          </OneWCaption>
          <GridThree
            firstPhoto={photos[3]}
            secondPhoto={photos[4]}
            thirdPhoto={photos[5]}
          />
          <OneCentered photo={photos[6]} />
          <TwoShifted firstPhoto={photos[7]} secondPhoto={photos[8]} />
          <TwoShifted
            firstPhoto={photos[9]}
            secondPhoto={photos[10]}
            inverted
          />
          <OneWoCaption photo={photos[10]} />
          <GridThree
            firstPhoto={photos[13]}
            secondPhoto={photos[15]}
            thirdPhoto={photos[14]}
            inverted
          />
          <OneCentered photo={photos[7]} />
          <GridThree
            firstPhoto={photos[16]}
            secondPhoto={photos[17]}
            thirdPhoto={photos[18]}
          />
          <GridTwo firstPhoto={photos[19]} secondPhoto={photos[20]} />
          <OneWCaption photo={photos[21]}>
            <>
              <span className="font-bold">Embracing</span> the sunny days{" "}
              <span className="font-bold">really</span>.
            </>
          </OneWCaption>
          <TwoShifted
            firstPhoto={photos[22]}
            secondPhoto={photos[23]}
            inverted
          />
          <TwoShifted firstPhoto={photos[24]} secondPhoto={photos[25]} />
          <TwoShifted
            firstPhoto={photos[26]}
            secondPhoto={photos[27]}
            inverted
          />
          <GridTwo firstPhoto={photos[28]} secondPhoto={photos[29]} />
          <ThreeAlined
            firstPhoto={photos[30]}
            secondPhoto={photos[31]}
            thirdPhoto={photos[32]}
          />
        </main>
      </Container>
    </LocomotiveScrollContainer>
  );
}
