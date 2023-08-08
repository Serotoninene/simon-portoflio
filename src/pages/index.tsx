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
import { homePhotos as photos } from "@/utils/store";

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
// [] make a little loading component for the work page
// [] rearrange the layout on mobile
// [] make an effect on scroll
// [] faire un test avec gsap flip pour la transition
// [] make the title blend mode (on work page)

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
              <span className="font-bold">The couch</span> couch waits all day
              for you <span className="font-bold">to come home.</span>
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
