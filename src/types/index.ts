export type Photo = {
  src: string;
  alt: string;
  caption?: Caption;
};

export type Caption = {
  idx?: string;
  title?: string;
  place?: string;
  date?: string;
};
