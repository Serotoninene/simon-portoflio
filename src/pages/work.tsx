import { Suspense, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { Loader } from "@/components/organisms";

import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";

export const photos = [
  {
    src: "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
    alt: "1_MY_GARDEN_IS_COOL",
    capitalizedTitle: "My garden is cool",
    dominantColor: "#272413",
  },
  {
    src: "/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg",
    alt: "2_MY_HOUSE_IS_A_TRIANGLE",
    capitalizedTitle: "My house is a triangle",
    dominantColor: "#a09a9d",
  },
  {
    src: "/assets/photos/03_GOOGLE_MAPS-ING.jpeg",
    alt: "3_GOOGLE_MAPS-ING",
    capitalizedTitle: "Google maps-ing",
    dominantColor: "#42361e",
  },
  {
    src: "/assets/photos/04_FISHING.jpeg",
    alt: "4_FISHING",
    capitalizedTitle: "Fishing",
    dominantColor: "#bfbda2",
  },
  {
    src: "/assets/photos/05_LIVING_ON_A_BOAT.jpeg",
    alt: "5_LIVING_ON_A_BOAT",
    capitalizedTitle: "Living on a boat",
    dominantColor: "#708d99",
  },
  {
    src: "/assets/photos/06_CROWDED.jpeg",
    alt: "6_CROWDED",
    capitalizedTitle: "Crowded",
    dominantColor: "#396b76",
  },
  {
    src: "/assets/photos/07_SQUARED.jpeg",
    alt: "7_SQUARED",
    capitalizedTitle: "Squared",
    dominantColor: "#957858",
  },
  {
    src: "/assets/photos/08_ALL_ABOUT_CLEANING.jpeg",
    alt: "8_ALL_ABOUT_CLEANING",
    capitalizedTitle: "All about cleaning",
    dominantColor: "#cab0a8",
  },
  {
    src: "/assets/photos/09_SUPERMARKET.jpeg",
    alt: "9_SUPERMARKET",
    capitalizedTitle: "Supermarket",
    dominantColor: "#a82f28",
  },
  {
    src: "/assets/photos/100_L'INCONNUE_VERTE.jpeg",
    alt: "00_L'INCONNUE_VERTE",
    capitalizedTitle: "L'inconnue verte",
    dominantColor: "#789a1c",
  },
  {
    src: "/assets/photos/101_UN_INCONNU_DE_DOS.jpeg",
    alt: "01_UN_INCONNU_DE_DOS",
    capitalizedTitle: "Un inconnu de dos",
    dominantColor: "#b18e6b",
  },
  {
    src: "/assets/photos/102_STRIPES.jpeg",
    alt: "02_STRIPES",
    capitalizedTitle: "Stripes",
    dominantColor: "#c3b6c7",
  },
  // {
  //   src: "/assets/photos/103_AVEC_ALLURE.jpeg",
  //   alt: "03_AVEC_ALLURE",
  //   capitalizedTitle: "Avec allure",
  //   dominantColor: "#071516",
  // },
  // {
  //   src: "/assets/photos/104_FAITH.jpeg",
  //   alt: "04_FAITH",
  //   capitalizedTitle: "Faith",
  //   dominantColor: "#2781a5",
  // },
  // {
  //   src: "/assets/photos/105_CHECK_YOUR_MAIL.jpeg",
  //   alt: "05_CHECK_YOUR_MAIL",
  //   capitalizedTitle: "Check your mail",
  //   dominantColor: "#a48358",
  // },
  // {
  //   src: "/assets/photos/106_RUNNING_TRACK.jpeg",
  //   alt: "06_RUNNING_TRACK",
  //   capitalizedTitle: "Running track",
  //   dominantColor: "#0a0804",
  // },
  // {
  //   src: "/assets/photos/107_NIGHT_SHOPS.jpeg",
  //   alt: "07_NIGHT_SHOPS",
  //   capitalizedTitle: "Night shops",
  //   dominantColor: "#6f8e7f",
  // },
  // {
  //   src: "/assets/photos/108_CLOUDS.jpeg",
  //   alt: "08_CLOUDS",
  //   capitalizedTitle: "Clouds",
  //   dominantColor: "#431719",
  // },
  // {
  //   src: "/assets/photos/109_THE SALES.jpeg",
  //   alt: "09_THE SALES",
  //   capitalizedTitle: "The sales",
  //   dominantColor: "#0c080c",
  // },
  // {
  //   src: "/assets/photos/10_TIME_FOR_LAUNDRY.jpeg",
  //   alt: "0_TIME_FOR_LAUNDRY",
  //   capitalizedTitle: "Time for laundry",
  //   dominantColor: "#aba5ac",
  // },
  // {
  //   src: "/assets/photos/110_LE_REPAS_DES_OMBRES.jpeg",
  //   alt: "10_LE_REPAS_DES_OMBRES",
  //   capitalizedTitle: "Le repas des ombres",
  //   dominantColor: "#2d160d",
  // },
  // {
  //   src: "/assets/photos/111_UN_DIMANCHE_EN_FRANCE.jpeg",
  //   alt: "11_UN_DIMANCHE_EN_FRANCE",
  //   capitalizedTitle: "Un dimanche en france",
  //   dominantColor: "#ac9564",
  // },
  // {
  //   src: "/assets/photos/112_A_BLURRED_BEAUTY.jpeg",
  //   alt: "12_A_BLURRED_BEAUTY",
  //   capitalizedTitle: "A blurred beauty",
  //   dominantColor: "#ad8276",
  // },
  // {
  //   src: "/assets/photos/113_GREEN_&_GRAY.jpeg",
  //   alt: "13_GREEN_&_GRAY",
  //   capitalizedTitle: "Green & gray",
  //   dominantColor: "#1c362f",
  // },
  // {
  //   src: "/assets/photos/114_FROM_THE_BUS.jpeg",
  //   alt: "14_FROM_THE_BUS",
  //   capitalizedTitle: "From the bus",
  //   dominantColor: "#c1b4b3",
  // },
  // {
  //   src: "/assets/photos/115_PALM_TREE_ON_MY_DOOR.jpeg",
  //   alt: "15_PALM_TREE_ON_MY_DOOR",
  //   capitalizedTitle: "Palm tree on my door",
  //   dominantColor: "#697588",
  // },
  // {
  //   src: "/assets/photos/116_A_GAS_STATION.jpeg",
  //   alt: "16_A_GAS_STATION",
  //   capitalizedTitle: "A gas station",
  //   dominantColor: "#111f15",
  // },
  // {
  //   src: "/assets/photos/117_A_MOTHER_HER_CHILD_AND_THE_SEE.jpeg",
  //   alt: "17_A_MOTHER_HER_CHILD_AND_THE_SEE",
  //   capitalizedTitle: "A mother her child and the see",
  //   dominantColor: "#a28a3c",
  // },
  // {
  //   src: "/assets/photos/118_FLOWERS_&_OCEAN.jpeg",
  //   alt: "18_FLOWERS_&_OCEAN",
  //   capitalizedTitle: "Flowers & ocean",
  //   dominantColor: "#b5a9ab",
  // },
  // {
  //   src: "/assets/photos/119_MOVING_SHADOWS.jpeg",
  //   alt: "19_MOVING_SHADOWS",
  //   capitalizedTitle: "Moving shadows",
  //   dominantColor: "#2a2218",
  // },
  // {
  //   src: "/assets/photos/11_APERITIF.jpeg",
  //   alt: "1_APERITIF",
  //   capitalizedTitle: "Aperitif",
  //   dominantColor: "#bfb7ae",
  // },
  // {
  //   src: "/assets/photos/120_FIGHTING_INFLATION.jpeg",
  //   alt: "20_FIGHTING_INFLATION",
  //   capitalizedTitle: "Fighting inflation",
  //   dominantColor: "#302011",
  // },
  // {
  //   src: "/assets/photos/121_A_DAY_AT_THE_BEACH.jpeg",
  //   alt: "21_A_DAY_AT_THE_BEACH",
  //   capitalizedTitle: "A day at the beach",
  //   dominantColor: "#d0bdab",
  // },
  // {
  //   src: "/assets/photos/122_FACADE.jpeg",
  //   alt: "22_FACADE",
  //   capitalizedTitle: "Facade",
  //   dominantColor: "#c3a69b",
  // },
  // {
  //   src: "/assets/photos/12_AROUND_THE_CORNER.jpeg",
  //   alt: "2_AROUND_THE_CORNER",
  //   capitalizedTitle: "Around the corner",
  //   dominantColor: "#acaba9",
  // },
  // {
  //   src: "/assets/photos/13_TROPICAL_CHURCH.jpeg",
  //   alt: "3_TROPICAL_CHURCH",
  //   capitalizedTitle: "Tropical church",
  //   dominantColor: "#b0aabb",
  // },
  // {
  //   src: "/assets/photos/14_ROOMS_FOR_ME_&_FOR_MY_CAR.jpeg",
  //   alt: "4_ROOMS_FOR_ME_&_FOR_MY_CAR",
  //   capitalizedTitle: "Rooms for me & for my car",
  //   dominantColor: "#dbc1ad",
  // },
  // {
  //   src: "/assets/photos/15_MONUMENT.jpeg",
  //   alt: "5_MONUMENT",
  //   capitalizedTitle: "Monument",
  //   dominantColor: "#b8adb1",
  // },
  // {
  //   src: "/assets/photos/16_WHITE_IN_THE_BLUE.jpeg",
  //   alt: "6_WHITE_IN_THE_BLUE",
  //   capitalizedTitle: "White in the blue",
  //   dominantColor: "#0b639f",
  // },
  // {
  //   src: "/assets/photos/17_A_POLAR_CHURCH.jpeg",
  //   alt: "7_A_POLAR_CHURCH",
  //   capitalizedTitle: "A polar church",
  //   dominantColor: "#1f262f",
  // },
  // {
  //   src: "/assets/photos/18_A_SCHOOL_IN_COLOR.jpeg",
  //   alt: "8_A_SCHOOL_IN_COLOR",
  //   capitalizedTitle: "A school in color",
  //   dominantColor: "#224e4f",
  // },
  // {
  //   src: "/assets/photos/19_I_MISSED_THE_TRAIN.jpeg",
  //   alt: "9_I_MISSED_THE_TRAIN",
  //   capitalizedTitle: "I missed the train",
  //   dominantColor: "#ae916e",
  // },
  // {
  //   src: "/assets/photos/20_LOVE_IN_A_RUBBER_BOAT.jpeg",
  //   alt: "0_LOVE_IN_A_RUBBER_BOAT",
  //   capitalizedTitle: "Love in a rubber boat",
  //   dominantColor: "#1a462e",
  // },
  // {
  //   src: "/assets/photos/21_LOVE_AT_THE_STREET_CORNER.jpeg",
  //   alt: "1_LOVE_AT_THE_STREET_CORNER",
  //   capitalizedTitle: "Love at the street corner",
  //   dominantColor: "#a5a196",
  // },
  // {
  //   src: "/assets/photos/22_HIDING_FROM_THE_SHADOWS.jpeg",
  //   alt: "2_HIDING_FROM_THE_SHADOWS",
  //   capitalizedTitle: "Hiding from the shadows",
  //   dominantColor: "#dac7b5",
  // },
  // {
  //   src: "/assets/photos/23_GOING_OUT_FOR_DINNER.jpeg",
  //   alt: "3_GOING_OUT_FOR_DINNER",
  //   capitalizedTitle: "Going out for dinner",
  //   dominantColor: "#699bae",
  // },
  // {
  //   src: "/assets/photos/24_DOWN_BY_THE_LAKE.jpeg",
  //   alt: "4_DOWN_BY_THE_LAKE",
  //   capitalizedTitle: "Down by the lake",
  //   dominantColor: "#83704a",
  // },
  // {
  //   src: "/assets/photos/25_THROUGH_THE_MIRROR.jpeg",
  //   alt: "5_THROUGH_THE_MIRROR",
  //   capitalizedTitle: "Through the mirror",
  //   dominantColor: "#bb9335",
  // },
  // {
  //   src: "/assets/photos/26_REST_AREA.jpeg",
  //   alt: "6_REST_AREA",
  //   capitalizedTitle: "Rest area",
  //   dominantColor: "#5a8ea2",
  // },
  // {
  //   src: "/assets/photos/27_THE_PERFECT_FAMILY.jpeg",
  //   alt: "7_THE_PERFECT_FAMILY",
  //   capitalizedTitle: "The perfect family",
  //   dominantColor: "#dfcdb7",
  // },
  // {
  //   src: "/assets/photos/28_FUMER_TUE.jpeg",
  //   alt: "8_FUMER_TUE",
  //   capitalizedTitle: "Fumer tue",
  //   dominantColor: "#e1cebe",
  // },
  // {
  //   src: "/assets/photos/29_UNE_MAQUETTE.jpeg",
  //   alt: "9_UNE_MAQUETTE",
  //   capitalizedTitle: "Une maquette",
  //   dominantColor: "#2d3519",
  // },
  // {
  //   src: "/assets/photos/30_DIVING_IN_THE_BLUE.jpeg",
  //   alt: "0_DIVING_IN_THE_BLUE",
  //   capitalizedTitle: "Diving in the blue",
  //   dominantColor: "#cacad5",
  // },
  // {
  //   src: "/assets/photos/31_LIFE_PERSPECTIVES.jpeg",
  //   alt: "1_LIFE_PERSPECTIVES",
  //   capitalizedTitle: "Life perspectives",
  //   dominantColor: "#66819d",
  // },
  // {
  //   src: "/assets/photos/31_STRANGER.jpeg",
  //   alt: "1_STRANGER",
  //   capitalizedTitle: "Stranger",
  //   dominantColor: "#431c11",
  // },
  // {
  //   src: "/assets/photos/32_BEN.jpeg",
  //   alt: "2_BEN",
  //   capitalizedTitle: "Ben",
  //   dominantColor: "#ae958f",
  // },
  // {
  //   src: "/assets/photos/32_SHANGLIE.jpeg",
  //   alt: "2_SHANGLIE",
  //   capitalizedTitle: "Shanglie",
  //   dominantColor: "#97aea6",
  // },
  // {
  //   src: "/assets/photos/33_KITA.jpeg",
  //   alt: "3_KITA",
  //   capitalizedTitle: "Kita",
  //   dominantColor: "#3e3d1e",
  // },
  // {
  //   src: "/assets/photos/33_MA_GRAND-MERE.jpeg",
  //   alt: "3_MA_GRAND-MERE",
  //   capitalizedTitle: "Ma grand-mere",
  //   dominantColor: "#954d30",
  // },
  // {
  //   src: "/assets/photos/34_AYMAN.jpeg",
  //   alt: "4_AYMAN",
  //   capitalizedTitle: "Ayman",
  //   dominantColor: "#8c9a90",
  // },
  // {
  //   src: "/assets/photos/35_WATCHING_THE_TRAIN_LEAVING.jpeg",
  //   alt: "5_WATCHING_THE_TRAIN_LEAVING",
  //   capitalizedTitle: "Watching the train leaving",
  //   dominantColor: "#231f17",
  // },
  // {
  //   src: "/assets/photos/36_THE_BEE.jpeg",
  //   alt: "6_THE_BEE",
  //   capitalizedTitle: "The bee",
  //   dominantColor: "#aba95c",
  // },
  // {
  //   src: "/assets/photos/37_LAYING_ON_THE_FIELD.jpeg",
  //   alt: "7_LAYING_ON_THE_FIELD",
  //   capitalizedTitle: "Laying on the field",
  //   dominantColor: "#bbb23d",
  // },
  // {
  //   src: "/assets/photos/38_DOLCE_VITA.jpeg",
  //   alt: "8_DOLCE_VITA",
  //   capitalizedTitle: "Dolce vita",
  //   dominantColor: "#ae7f2b",
  // },
  // {
  //   src: "/assets/photos/39_RED_BOXES.jpeg",
  //   alt: "9_RED_BOXES",
  //   capitalizedTitle: "Red boxes",
  //   dominantColor: "#9d91a7",
  // },
  // {
  //   src: "/assets/photos/40_FLAT_17_A.jpeg",
  //   alt: "0_FLAT_17_A",
  //   capitalizedTitle: "Flat 17 a",
  //   dominantColor: "#e1c9ad",
  // },
  // {
  //   src: "/assets/photos/41_A_REGULAR.jpeg",
  //   alt: "1_A_REGULAR",
  //   capitalizedTitle: "A regular",
  //   dominantColor: "#617682",
  // },
  // {
  //   src: "/assets/photos/42_TIME_TO_DRY.jpeg",
  //   alt: "2_TIME_TO_DRY",
  //   capitalizedTitle: "Time to dry",
  //   dominantColor: "#b49d91",
  // },
  // {
  //   src: "/assets/photos/43_PRIMAVERA.jpeg",
  //   alt: "3_PRIMAVERA",
  //   capitalizedTitle: "Primavera",
  //   dominantColor: "#315810",
  // },
  // {
  //   src: "/assets/photos/44_LEMONADE.jpeg",
  //   alt: "4_LEMONADE",
  //   capitalizedTitle: "Lemonade",
  //   dominantColor: "#d2ac55",
  // },
  // {
  //   src: "/assets/photos/45_LIVING_THE_DREAM.jpeg",
  //   alt: "5_LIVING_THE_DREAM",
  //   capitalizedTitle: "Living the dream",
  //   dominantColor: "#2d363c",
  // },
  // {
  //   src: "/assets/photos/46_DREAMING_THE_DREAM.jpeg",
  //   alt: "6_DREAMING_THE_DREAM",
  //   capitalizedTitle: "Dreaming the dream",
  //   dominantColor: "#ba7d37",
  // },
  // {
  //   src: "/assets/photos/47_LE_PIED_ET_LE_PARASOL.jpeg",
  //   alt: "7_LE_PIED_ET_LE_PARASOL",
  //   capitalizedTitle: "Le pied et le parasol",
  //   dominantColor: "#ae932b",
  // },
  // {
  //   src: "/assets/photos/48_LA_FILLE_ET_LE_PARAPLUIE.jpeg",
  //   alt: "8_LA_FILLE_ET_LE_PARAPLUIE",
  //   capitalizedTitle: "La fille et le parapluie",
  //   dominantColor: "#aa908a",
  // },
  // {
  //   src: "/assets/photos/49_THE_SUN_BEATS_DOWN.jpeg",
  //   alt: "9_THE_SUN_BEATS_DOWN",
  //   capitalizedTitle: "The sun beats down",
  //   dominantColor: "#aba89c",
  // },
  // {
  //   src: "/assets/photos/50_LOST_IN_THE_FOREST.jpeg",
  //   alt: "0_LOST_IN_THE_FOREST",
  //   capitalizedTitle: "Lost in the forest",
  //   dominantColor: "#aea925",
  // },
  // {
  //   src: "/assets/photos/51_ANGLE.jpeg",
  //   alt: "1_ANGLE",
  //   capitalizedTitle: "Angle",
  //   dominantColor: "#beb5ab",
  // },
  // {
  //   src: "/assets/photos/52_LEGS_&_STRIPES.jpeg",
  //   alt: "2_LEGS_&_STRIPES",
  //   capitalizedTitle: "Legs & stripes",
  //   dominantColor: "#136997",
  // },
  // {
  //   src: "/assets/photos/53_FACING_WATER.jpeg",
  //   alt: "3_FACING_WATER",
  //   capitalizedTitle: "Facing water",
  //   dominantColor: "#c7b9b3",
  // },
  // {
  //   src: "/assets/photos/54_REFLECTIONS.jpeg",
  //   alt: "4_REFLECTIONS",
  //   capitalizedTitle: "Reflections",
  //   dominantColor: "#212a23",
  // },
  // {
  //   src: "/assets/photos/55_TROTINETTE_INTERDITE.jpeg",
  //   alt: "5_TROTINETTE_INTERDITE",
  //   capitalizedTitle: "Trotinette interdite",
  //   dominantColor: "#b6bcc2",
  // },
  // {
  //   src: "/assets/photos/56_ME_AND_MYSELF.jpeg",
  //   alt: "6_ME_AND_MYSELF",
  //   capitalizedTitle: "Me and myself",
  //   dominantColor: "#89805d",
  // },
  // {
  //   src: "/assets/photos/57_THIS_HOUSE.jpeg",
  //   alt: "7_THIS_HOUSE",
  //   capitalizedTitle: "This house",
  //   dominantColor: "#d5bdab",
  // },
  // {
  //   src: "/assets/photos/58_BEFORE_THE_STORM.jpeg",
  //   alt: "8_BEFORE_THE_STORM",
  //   capitalizedTitle: "Before the storm",
  //   dominantColor: "#999286",
  // },
  // {
  //   src: "/assets/photos/59_VIDAR.jpeg",
  //   alt: "9_VIDAR",
  //   capitalizedTitle: "Vidar",
  //   dominantColor: "#dcbbb3",
  // },
  // {
  //   src: "/assets/photos/60_STRANGERS.jpeg",
  //   alt: "0_STRANGERS",
  //   capitalizedTitle: "Strangers",
  //   dominantColor: "#2d454a",
  // },
  // {
  //   src: "/assets/photos/61_JOSE.jpeg",
  //   alt: "1_JOSE",
  //   capitalizedTitle: "Jose",
  //   dominantColor: "#a77e62",
  // },
  // {
  //   src: "/assets/photos/62_1,2,3.jpeg",
  //   alt: "2_1,2,3",
  //   capitalizedTitle: "1,2,3",
  //   dominantColor: "#b7816c",
  // },
  // {
  //   src: "/assets/photos/63_THE_FLOOR.jpeg",
  //   alt: "3_THE_FLOOR",
  //   capitalizedTitle: "The floor",
  //   dominantColor: "#999a93",
  // },
  // {
  //   src: "/assets/photos/64_WHAT'S_UP.jpeg",
  //   alt: "4_WHAT'S_UP",
  //   capitalizedTitle: "What's up",
  //   dominantColor: "#bea572",
  // },
  // {
  //   src: "/assets/photos/65_LA_PLUIE_ET_PARIS.jpeg",
  //   alt: "5_LA_PLUIE_ET_PARIS",
  //   capitalizedTitle: "La pluie et paris",
  //   dominantColor: "#c2b7b7",
  // },
  // {
  //   src: "/assets/photos/66_CHEZ_LE_COIFFEUR.jpeg",
  //   alt: "6_CHEZ_LE_COIFFEUR",
  //   capitalizedTitle: "Chez le coiffeur",
  //   dominantColor: "#cdbab2",
  // },
  // {
  //   src: "/assets/photos/67_JUST_ABOUT_TO_GET_HOME.jpeg",
  //   alt: "7_JUST_ABOUT_TO_GET_HOME",
  //   capitalizedTitle: "Just about to get home",
  //   dominantColor: "#d0c2ae",
  // },
  // {
  //   src: "/assets/photos/68_TERRACE.jpeg",
  //   alt: "8_TERRACE",
  //   capitalizedTitle: "Terrace",
  //   dominantColor: "#6f3d1b",
  // },
  // {
  //   src: "/assets/photos/69_SHAPES.jpeg",
  //   alt: "9_SHAPES",
  //   capitalizedTitle: "Shapes",
  //   dominantColor: "#e2ab67",
  // },
  // {
  //   src: "/assets/photos/70_URBAN_DESIGN.jpeg",
  //   alt: "0_URBAN_DESIGN",
  //   capitalizedTitle: "Urban design",
  //   dominantColor: "#d2b798",
  // },
  // {
  //   src: "/assets/photos/71_THERE_IS_NOTHING_ON_THE_ROOF.jpeg",
  //   alt: "1_THERE_IS_NOTHING_ON_THE_ROOF",
  //   capitalizedTitle: "There is nothing on the roof",
  //   dominantColor: "#c7925b",
  // },
  // {
  //   src: "/assets/photos/72_LA_VIE_ET_SES_PLAISIRS.jpeg",
  //   alt: "2_LA_VIE_ET_SES_PLAISIRS",
  //   capitalizedTitle: "La vie et ses plaisirs",
  //   dominantColor: "#cda36d",
  // },
  // {
  //   src: "/assets/photos/73_FAKING_CAMPING.jpeg",
  //   alt: "3_FAKING_CAMPING",
  //   capitalizedTitle: "Faking camping",
  //   dominantColor: "#192518",
  // },
  // {
  //   src: "/assets/photos/74_INTERWINED.jpeg",
  //   alt: "4_INTERWINED",
  //   capitalizedTitle: "Interwined",
  //   dominantColor: "#c1c188",
  // },
  // {
  //   src: "/assets/photos/75_LA_CALLE.jpeg",
  //   alt: "5_LA_CALLE",
  //   capitalizedTitle: "La calle",
  //   dominantColor: "#b8aab4",
  // },
  // {
  //   src: "/assets/photos/76_SEA_SIDE.jpeg",
  //   alt: "6_SEA_SIDE",
  //   capitalizedTitle: "Sea side",
  //   dominantColor: "#17131f",
  // },
  // {
  //   src: "/assets/photos/77_AMOR_A_LA_ESQUINA.jpeg",
  //   alt: "7_AMOR_A_LA_ESQUINA",
  //   capitalizedTitle: "Amor a la esquina",
  //   dominantColor: "#17271f",
  // },
  // {
  //   src: "/assets/photos/78_PEATONAL.jpeg",
  //   alt: "8_PEATONAL",
  //   capitalizedTitle: "Peatonal",
  //   dominantColor: "#9b9f9b",
  // },
  // {
  //   src: "/assets/photos/82_OH_I_SEE_HER.jpeg",
  //   alt: "2_OH_I_SEE_HER",
  //   capitalizedTitle: "Oh i see her",
  //   dominantColor: "#a29c99",
  // },
  // {
  //   src: "/assets/photos/83_FLIP_FLOPS.jpeg",
  //   alt: "3_FLIP_FLOPS",
  //   capitalizedTitle: "Flip flops",
  //   dominantColor: "#d1973a",
  // },
  // {
  //   src: "/assets/photos/84_PLANET.jpeg",
  //   alt: "4_PLANET",
  //   capitalizedTitle: "Planet",
  //   dominantColor: "#ccc4cb",
  // },
  // {
  //   src: "/assets/photos/85_LIGHTING_THE_DAY.jpeg",
  //   alt: "5_LIGHTING_THE_DAY",
  //   capitalizedTitle: "Lighting the day",
  //   dominantColor: "#3f7385",
  // },
  // {
  //   src: "/assets/photos/86_FIFTH_AVENUE.jpeg",
  //   alt: "6_FIFTH_AVENUE",
  //   capitalizedTitle: "Fifth avenue",
  //   dominantColor: "#d2cacb",
  // },
  // {
  //   src: "/assets/photos/87_STOOOOP!.jpeg",
  //   alt: "7_STOOOOP!",
  //   capitalizedTitle: "Stoooop!",
  //   dominantColor: "#8f705f",
  // },
  // {
  //   src: "/assets/photos/88_LA_CHASSE_EN_AMERIQUE.jpeg",
  //   alt: "8_LA_CHASSE_EN_AMERIQUE",
  //   capitalizedTitle: "La chasse en amerique",
  //   dominantColor: "#c4c0cc",
  // },
  // {
  //   src: "/assets/photos/89_COOL_BUILDING.jpeg",
  //   alt: "9_COOL_BUILDING",
  //   capitalizedTitle: "Cool building",
  //   dominantColor: "#8da8aa",
  // },
  // {
  //   src: "/assets/photos/90_NO_EXIT.jpeg",
  //   alt: "0_NO_EXIT",
  //   capitalizedTitle: "No exit",
  //   dominantColor: "#0d494f",
  // },
  // {
  //   src: "/assets/photos/91_EXCLUSION.jpeg",
  //   alt: "1_EXCLUSION",
  //   capitalizedTitle: "Exclusion",
  //   dominantColor: "#baab98",
  // },
  // {
  //   src: "/assets/photos/92_L'ETE_EN_FRANCAIS.jpeg",
  //   alt: "2_L'ETE_EN_FRANCAIS",
  //   capitalizedTitle: "L'ete en francais",
  //   dominantColor: "#cebdb4",
  // },
  // {
  //   src: "/assets/photos/93_LATE_AFTERNOON.jpeg",
  //   alt: "3_LATE_AFTERNOON",
  //   capitalizedTitle: "Late afternoon",
  //   dominantColor: "#d2bcab",
  // },
  // {
  //   src: "/assets/photos/94_LIQUOR_STORE.jpeg",
  //   alt: "4_LIQUOR_STORE",
  //   capitalizedTitle: "Liquor store",
  //   dominantColor: "#ba9d73",
  // },
  // {
  //   src: "/assets/photos/95_THE_FISHERMEN'S_TOWN.jpeg",
  //   alt: "5_THE_FISHERMEN'S_TOWN",
  //   capitalizedTitle: "The fishermen's town",
  //   dominantColor: "#baaba8",
  // },
  {
    src: "/assets/photos/96_WILD.jpeg",
    alt: "6_WILD",
    capitalizedTitle: "Wild",
    dominantColor: "#0b2532",
  },
  {
    src: "/assets/photos/97_CHEZ_JOANNE.jpeg",
    alt: "7_CHEZ_JOANNE",
    capitalizedTitle: "Chez joanne",
    dominantColor: "#bba8a1",
  },
  {
    src: "/assets/photos/98_NOUS_ETIONS_CHEZ_NOUS.jpeg",
    alt: "8_NOUS_ETIONS_CHEZ_NOUS",
    capitalizedTitle: "Nous etions chez nous",
    dominantColor: "#7a6f41",
  },
  {
    src: "/assets/photos/99_STRANGER.jpeg",
    alt: "9_STRANGER",
    capitalizedTitle: "Stranger",
    dominantColor: "#b0a69c",
  },
];

const HTMLPart = () => {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");
  const { isOverview } = useOverviewContext();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, [isOverview]);

  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  useEffect(() => {
    if (!scrollYProgress) return;
    scrollYProgress.on("change", (e: any) => {
      setIdx(Math.round(e * (photos.length - 1)));
    });
  }, [scrollYProgress]);

  return (
    <>
      <div
        id="gallery-container"
        className={`relative ${
          isOverview
            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-6"
            : "flex flex-col gap-6 sm:gap-8 md:gap-[50vh]"
        }`}
      >
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className={isOverview ? "flex h-full overflow-hidden " : ""}
          >
            <Photo photo={photo} />
          </div>
        ))}
      </div>
      <WorkFooter photos={photos} title={title} idx={idx} />
    </>
  );
};

// i need the src, alt, capitalizedTitle, and the date

export default function Work() {
  if (!photos) return;
  return (
    <Container className="pt-0">
      <OverviewProvider>
        <Suspense fallback={<Loader />}>
          {/* <div className="fixed top-0 left-0 right-0 bottom-0">
            <Scene photos={photos} />
          </div> */}
          <HTMLPart />
        </Suspense>
      </OverviewProvider>
    </Container>
  );
}
