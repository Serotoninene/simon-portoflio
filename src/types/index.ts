export type Photo = {
  src: string;
  alt?: string;
  caption?: Caption;
};

export type ExtendedPhoto = Photo & {
  date: string;
  capitalizedTitle: string;
};

export type Caption = {
  idx?: string;
  title?: string;
  place?: string;
  date?: string;
};
