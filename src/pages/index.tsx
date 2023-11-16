import {
  HeroHome,
  GridTwo,
  OneWCaption,
  TwoShifted,
  Outro,
  About,
} from "@/components/home";

import { Container, LocomotiveScrollContainer } from "@/components/molecules";
import { Loader } from "@/components/organisms";
import { Photo } from "@/types";

// TO DO
// [] rearrange the layout on mobile
// [] when overview scroll malfunctions (no bug on live version ...)
// [] try and see if snapping isn't possible

export const photos: Photo[] = [
  {
    src: "/assets/photos/home/01_MY_GARDEN_IS_COOL.jpeg",
    mobileSrc: "/assets/photos/summer/01_MY_GARDEN_IS_COOL.jpeg",
    alt: "01_MY_GARDEN_IS_COOL",
    dominantColor: "#282515",
    caption: {
      idx: "1",
      title: "MY GARDEN IS COOL",
      place: "Canary Islands (ES)",
      date: "2021",
    },
    aspectRatio: 1.4927113702623906,
  },
  {
    src: "/assets/photos/home/02_MY_HOUSE_IS_A_TRIANGLE.jpeg",
    mobileSrc: "/assets/photos/autumn/02_MY_HOUSE_IS_A_TRIANGLE.jpeg",
    alt: "02_MY_HOUSE_IS_A_TRIANGLE",
    dominantColor: "#a29c9d",
    caption: {
      idx: "2",
      title: "MY HOUSE IS A TRIANGLE",
      place: "Vancouver (CA)",
      date: "2020",
    },
    aspectRatio: 0.747557003257329,
  },
  {
    src: "/assets/photos/home/03_GOOGLE_MAPS-ING.jpeg",
    mobileSrc: "/assets/photos/autumn/03_GOOGLE_MAPS-ING.jpeg",
    alt: "03_GOOGLE_MAPS-ING",
    dominantColor: "#413722",
    caption: {
      idx: "3",
      title: "GOOGLE MAPS-ING",
      place: "Honolulu (US)",
      date: "2020",
    },
    aspectRatio: 1.480456026058632,
  },
  {
    src: "/assets/photos/home/72_LA_VIE_ET_SES_PLAISIRS.jpeg",
    mobileSrc: "/assets/photos/summer/72_LA_VIE_ET_SES_PLAISIRS.jpeg",
    alt: "72_LA_VIE_ET_SES_PLAISIRS",
    dominantColor: "#789aa8",
    caption: {
      idx: "4",
      title: "LA VIE ET SES PLAISIRS",
      place: "Saint-Tropez (FR)",
      date: "2022",
    },
    aspectRatio: 1.5,
  },
  {
    src: "/assets/photos/home/09_SUPERMARKET.jpeg",
    mobileSrc: "/assets/photos/summer/09_SUPERMARKET.jpeg",
    alt: "09_SUPERMARKET",
    dominantColor: "#9e382f",
    caption: {
      idx: "5",
      title: "SUPERMARKET",
      place: "Provence-Alpes-Côte d’Azur (FR)",
      date: "2021",
    },
    aspectRatio: 1.5086762518591967,
  },
  {
    src: "/assets/photos/home/47_LE_PIED_ET_LE_PARASOL.jpeg",
    mobileSrc: "/assets/photos/summer/47_LE_PIED_ET_LE_PARASOL.jpeg",
    alt: "47_LE_PIED_ET_LE_PARASOL",
    dominantColor: "#decfc0",
    caption: {
      idx: "6",
      title: "LE PIED ET LE PARASOL",
      place: "Victoria (CA)",
      date: "2020",
    },
    aspectRatio: 1.4806949806949807,
  },
  {
    src: "/assets/photos/home/48_LA_FILLE_ET_LE_PARAPLUIE.jpeg",
    mobileSrc: "/assets/photos/winter/48_LA_FILLE_ET_LE_PARAPLUIE.jpeg",
    alt: "48_LA_FILLE_ET_LE_PARAPLUIE",
    dominantColor: "#19261d",
    caption: {
      idx: "7",
      title: "LA FILLE ET LE PARAPLUIE",
      place: "Paris (FR)",
      date: "2022",
    },
    aspectRatio: 1.507991660875608,
  },

  {
    src: "/assets/photos/summer/44_LEMONADE.jpeg",
    alt: "4_LEMONADE",
    dominantColor: "#d2ac55",
    caption: {
      idx: "8",
      title: "LEMONADE",
      place: "Amsterdam (NL)",
      date: "2022",
    },
    aspectRatio: 1.5005707762557077,
  },
  {
    src: "/assets/photos/home/43_PRIMAVERA.jpeg",
    alt: "43_PRIMAVERA",
    dominantColor: "",
    caption: {
      idx: "9",
      title: "PRIMAVERA",
      place: "Bruxelles (BE)",
      date: "2022",
    },
    aspectRatio: 0.6772463120250335,
  },
  {
    src: "/assets/photos/home/07_SQUARED.jpeg",
    alt: "07_SQUARED",
    dominantColor: "#917b5d",
    caption: { idx: "10", title: "SQUARED", place: "Hawaï (US)", date: "2020" },
    aspectRatio: 2.1839220462850184,
  },
  {
    src: "/assets/photos/winter/30_DIVING_IN_THE_BLUE.jpeg",
    alt: "30_DIVING IN THE BLUE",
    dominantColor: "#cacad5",
    caption: {
      idx: "11",
      title: "DIVING IN THE BLUE",
      place: "Canary Islands (CA)",
      date: "2021",
    },
    aspectRatio: 1.4927113702623906,
  },
  {
    src: "/assets/photos/autumn/29_UNE_MAQUETTE.jpeg",
    alt: "9_UNE_MAQUETTE",
    dominantColor: "#2d3519",
    caption: {
      idx: "12",
      title: "APERITIF",
      place: "Montréal (CA)",
      date: "2019",
    },
    aspectRatio: 1.5078125,
  },

  {
    src: "/assets/photos/home/31_LIFE_PERSPECTIVES.jpeg",
    alt: "31_LIFE_PERSPECTIVES",
    dominantColor: "#ababa7",
    caption: {
      idx: "13",
      title: "LIFE PERSPECTIVES",
      place: "Mexico City (MX)",
      date: "2019",
    },
    aspectRatio: 1.4806265457543282,
  },
];

export default function Home() {
  // to calculate the aspect ratio
  // useEffect(() => {
  //   //  getting the aspect ratio of the image sources
  //   photos.forEach((photo, idx) => {
  //     const img = new Image();
  //     img.src = photo.src;

  //     img.onload = () => {
  //       const w = img.naturalWidth;
  //       const h = img.naturalHeight;
  //       photo.aspectRatio = w / h;
  //     };
  //   });

  //   setTimeout(() => {
  //     console.log(JSON.stringify(photos));
  //   }, 500);
  // }, []);

  if (!photos) return null;

  return (
    <LocomotiveScrollContainer>
      <Loader />

      <Container className="pt-6">
        <div className="relative flex flex-col items gap-24 sm:gap-56 pb-6 bg-light">
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
          <TwoShifted firstPhoto={photos[3]} secondPhoto={photos[4]} />
          <TwoShifted firstPhoto={photos[6]} secondPhoto={photos[5]} inverted />
          <OneWCaption photo={photos[7]}>
            <>
              <span className="font-bold">The couch</span> waits all day for you{" "}
              <span className="font-bold">to come home</span>.
            </>
          </OneWCaption>
        </div>
      </Container>
      <Outro />
    </LocomotiveScrollContainer>
  );
}
