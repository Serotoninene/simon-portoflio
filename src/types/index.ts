export type Photo = {
  src: string;
  alt: string;
  dominantColor?: string;
  caption?: Caption;
};

export type ExtendedPhoto = Photo & {
  date: string;
  group: string;
  capitalizedTitle: string;
  aspectRatio: number;
  place: string;
};

export type Caption = {
  idx?: string;
  title?: string;
  place?: string;
  date?: string;
};
