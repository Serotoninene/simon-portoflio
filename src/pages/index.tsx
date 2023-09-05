import {
  HeroHome,
  GridTwo,
  OneWCaption,
  GridThree,
  OneCentered,
  TwoShifted,
  ThreeAlined,
  Outro,
  About,
} from "@/components/home";
import { OneWoCaption } from "@/components/home/OneWoCaption";
import { Container, LocomotiveScrollContainer } from "@/components/molecules";
import { Loader } from "@/components/organisms";

// TO DO
// [X] changer les photos d'après le figma
// [X] changer le ratio pour le component OneWCaption
// [X] faire un script qui chope les couleurs dominantes + qui complète le photos array avec les index et les couleurs
// [X] commencer l'animation seulement après que la heroPhoto soit chargée / apparue
// [X] faire l'intro pour les photos de la page work
// [X] polish the layout animation for the work page
// [X] refactor the work page
// [X] try again using the isOverview context god damnit !
// [X] make a custom cursor
// [X] switch for the new favicon
// [X] insert most of the photos in work
// [X] faire un test avec gsap flip pour la transition
// [X] do the lazy loading with dominant color : https://jagad.dev/posts/custom-image-transition-in-nextjs-with-tailwind-css
// [X] do a small opacity animation to intro and exit work page
// [X] make the title blend mode (on work page)
// [X] add a "move to see al the photos" at the bottom of index
// [X] clean the numbers of photos on the Two Shifted component
// [X] smooth the scroll on the work page
// [X] add the Simon introduction to the index
// [X] make the rgb shift appear more quickly to the
// [X] navbar disappears sometimes
// [X] improve custom cursor performance
// [X] kinda lost time over photos management for no real reason
// [X] contact page
// [] animate loading screen
// [] groups sometime disappear since added the anim on hover
// [] when overview scroll malfunctions
// [] add the trailing with TouchTexture

// [] try and see if snapping isn't possible
// [] rearrange the layout on mobile

export const photos = [
  {
    src: "/assets/photos/home/01_MY_GARDEN_IS_COOL.jpeg",
    alt: "01_MY_GARDEN_IS_COOL",
    dominantColor: "#282515",
    caption: {
      idx: "1",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    src: "/assets/photos/home/02_MY_HOUSE_IS_A_TRIANGLE.jpeg",
    alt: "02_MY_HOUSE_IS_A_TRIANGLE",
    dominantColor: "#a29c9d",
    caption: {
      idx: "2",
      title: "MY HOUSE IS A TRIANGLE",
      place: "Vancouver (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/03_GOOGLE_MAPS-ING.jpeg",
    alt: "03_GOOGLE_MAPS-ING",
    dominantColor: "#413722",
    caption: {
      idx: "3",
      title: "GOOGLE MAPS-ING",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/04_FISHING.jpeg",
    alt: "04_FISHING",
    dominantColor: "#bdbba3",
    caption: {
      idx: "4",
      title: "FISHING",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
  },
  {
    src: "/assets/photos/home/05_LIVING_ON_A_BOAT.jpeg",
    alt: "05_LIVING_ON_A_BOAT",
    dominantColor: "#798d97",
    caption: {
      idx: "5",
      title: "LIVING ON A BOAT",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    src: "/assets/photos/home/06_CROWDED.jpeg",
    alt: "06_CROWDED",
    dominantColor: "#a6b2bc",
    caption: {
      idx: "6",
      title: "CROWDED",
      place: "Canary Islands (ES)",
      date: "2021",
    },
  },
  {
    src: "/assets/photos/home/07_SQUARED.jpeg",
    alt: "07_SQUARED",
    dominantColor: "#917b5d",
    caption: { idx: "7", title: "SQUARED", place: "Hawaï (US)", date: "2020" },
  },
  {
    src: "/assets/photos/home/08_ALL_ABOUT_CLEANING.jpeg",
    alt: "08_ALL_ABOUT_CLEANING",
    dominantColor: "#c3afa5",
    caption: {
      idx: "8",
      title: "ALL ABOUT CLEANING",
      place: "Canary Islands (ES)",
      date: "2023",
    },
  },
  {
    src: "/assets/photos/home/09_SUPERMARKET.jpeg",
    alt: "09_SUPERMARKET",
    dominantColor: "#9e382f",
    caption: {
      idx: "9",
      title: "SUPERMARKET",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
  },
  {
    src: "/assets/photos/home/11_APERITIF.jpeg",
    alt: "11_APERITIF",
    dominantColor: "#bcb7af",
    caption: {
      idx: "11",
      title: "APERITIF",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/10_TIME_FOR_LAUNDRY.jpeg",
    alt: "10_TIME_FOR_LAUNDRY",
    dominantColor: "#a8a4aa",
    caption: {
      idx: "10",
      title: "TIME FOR LAUNDRY",
      place: "Vancouver (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/31_LIFE_PERSPECTIVES.jpeg",
    alt: "31_LIFE_PERSPECTIVES",
    dominantColor: "#ababa7",
    caption: {
      idx: "12",
      title: "LIFE PERSPECTIVES",
      place: "Vancouver Island (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/14_ROOMS_FOR_ME_&_FOR_MY_CAR.jpeg",
    alt: "14_ROOMS_FOR_ME_&_FOR_MY_CAR",
    dominantColor: "#cfbaa5",
    caption: {
      idx: "13",
      title: "ROOMS FOR ME & FOR MY CAR",
      place: "Drumheller (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/15_MONUMENT.jpeg",
    alt: "15_MONUMENT",
    dominantColor: "#b6adb0",
    caption: {
      idx: "14",
      title: "MONUMENT",
      place: "Whitehorse (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/13_TROPICAL_CHURCH.jpeg",
    alt: "13_TROPICAL_CHURCH",
    dominantColor: "#aeaab9",
    caption: {
      idx: "15",
      title: "TROPICAL CHURCH",
      place: "Honolulu (US)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/19_I_MISSED_THE_TRAIN.jpeg",
    alt: "19_I_MISSED_THE_TRAIN",
    dominantColor: "#cabdb7",
    caption: {
      idx: "16",
      title: "I MISSED THE TRAIN",
      place: "Somewhere in Norway (NO)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/23_GOING_OUT_FOR_DINNER.jpeg",
    alt: "23_GOING_OUT_FOR_DINNER",
    dominantColor: "#262b33",
    caption: {
      idx: "17",
      title: "GOING OUT FOR DINNER",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/24_DOWN_BY_THE_LAKE.jpeg",
    alt: "24_DOWN_BY_THE_LAKE",
    dominantColor: "#304d4e",
    caption: {
      idx: "18",
      title: "DOWN BY THE LAKE",
      place: "Vancouver Island (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/25_THROUGH_THE_MIRROR.jpeg",
    alt: "25_THROUGH_THE_MIRROR",
    dominantColor: "#a39279",
    caption: {
      idx: "19",
      title: "THROUGH THE MIRROR",
      place: "Mexico City (MX)",
      date: "2019",
    },
  },
  {
    src: "/assets/photos/home/42_TIME_TO_DRY.jpeg",
    alt: "42_TIME_TO_DRY",
    dominantColor: "",
    caption: {
      idx: "20",
      title: "TIME TO DRY",
      place: "Saint-Tropez (FR)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/43_PRIMAVERA.jpeg",
    alt: "43_PRIMAVERA",
    dominantColor: "",
    caption: {
      idx: "21",
      title: "PRIMAVERA",
      place: "Bruxelles (BE)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/44_LEMONADE.jpeg",
    alt: "44_LEMONADE",
    dominantColor: "#d2c6b4",
    caption: {
      idx: "22",
      title: "LEMONADE",
      place: "Amsterdam (NL)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/72_LA_VIE_ET_SES_PLAISIRS.jpeg",
    alt: "72_LA_VIE_ET_SES_PLAISIRS",
    dominantColor: "#789aa8",
    caption: {
      idx: "24",
      title: "LA VIE ET SES PLAISIRS",
      place: "Saint-Tropez (FR)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/71_THERE_IS_NOTHING_ON_THE_ROOF.jpeg",
    alt: "71_THERE_IS_NOTHING_ON_THE_ROOF",
    dominantColor: "#817250",
    caption: {
      idx: "23",
      title: "THERE IS NOTHING ON THE ROOF",
      place: "Bergen (NO)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/45_LIVING_THE_DREAM.jpeg",
    alt: "45_LIVING_THE_DREAM",
    dominantColor: "#ba9a48",
    caption: {
      idx: "25",
      title: "LIVING THE DREAM",
      place: "Hawaï (US)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/46_DREAMING_THE_DREAM.jpeg",
    alt: "46_DREAMING_THE_DREAM",
    dominantColor: "#688fa1",
    caption: {
      idx: "26",
      title: "DREAMING THE DREAM",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/48_LA_FILLE_ET_LE_PARAPLUIE.jpeg",
    alt: "48_LA_FILLE_ET_LE_PARAPLUIE",
    dominantColor: "#19261d",
    caption: {
      idx: "28",
      title: "LA FILLE ET LE PARAPLUIE",
      place: "Paris (FR)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/47_LE_PIED_ET_LE_PARASOL.jpeg",
    alt: "47_LE_PIED_ET_LE_PARASOL",
    dominantColor: "#decfc0",
    caption: {
      idx: "27",
      title: "LE PIED ET LE PARASOL",
      place: "Victoria (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/20_LOVE_IN_A_RUBBER_BOAT.jpeg",
    alt: "20_LOVE_IN_A_RUBBER_BOAT",
    dominantColor: "#244631",
    caption: {
      idx: "29",
      title: "LOVE IN A RUBBER BOAT",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/21_LOVE_AT_THE_STREET_CORNER.jpeg",
    alt: "21_LOVE_AT_THE_STREET_CORNER",
    dominantColor: "#a2a196",
    caption: {
      idx: "30",
      title: "LOVE AT THE STREET CORNER",
      place: "Brussels (BE)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/31_STRANGER.jpeg",
    alt: "31_STRANGER",
    dominantColor: "#422114",
    caption: {
      idx: "31",
      title: "STRANGER",
      place: "Alberta (CA)",
      date: "2020",
    },
  },
  {
    src: "/assets/photos/home/32_SHANGLIE.jpeg",
    alt: "32_SHANGLIE",
    dominantColor: "#9dafa8",
    caption: {
      idx: "32",
      title: "SHANGLIE",
      place: "Vielsalm (BE)",
      date: "2022",
    },
  },
  {
    src: "/assets/photos/home/33_MA_GRAND-MERE.jpeg",
    alt: "33_MA_GRAND-MERE",
    dominantColor: "#8c543c",
    caption: {
      idx: "33",
      title: "MA GRAND-MERE",
      place: "Haute-Garonne (FR)",
      date: "2023",
    },
  },
];

export default function Home() {
  if (!photos)
    return (
      <div className="bg-red-400 h-[var(--fullScreen)] flex justify-center items-center"></div>
    );

  return (
    <LocomotiveScrollContainer>
      <Loader />

      <Container className="pt-6">
        <div className="relative flex flex-col items gap-56 pb-6 bg-light">
          <HeroHome />
          <About />
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
          <OneWoCaption photo={photos[11]} />
          <GridThree
            firstPhoto={photos[12]}
            secondPhoto={photos[13]}
            thirdPhoto={photos[14]}
            inverted
          />
          <OneCentered photo={photos[15]} />
          <GridThree
            firstPhoto={photos[16]}
            secondPhoto={photos[17]}
            thirdPhoto={photos[18]}
          />
          <GridTwo firstPhoto={photos[19]} secondPhoto={photos[20]} />
          <OneWCaption photo={photos[21]}>
            <>
              <span className="font-bold">The couch</span> waits all day for you{" "}
              <span className="font-bold">to come home.</span>
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
        </div>
      </Container>
      <Outro />
    </LocomotiveScrollContainer>
  );
}
