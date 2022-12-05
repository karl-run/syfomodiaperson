export enum Menypunkter {
  AKTIVITETSKRAV = "AKTIVITETSKRAV",
  DIALOGMOTE = "DIALOGMOTE",
  NOKKELINFORMASJON = "NOKKELINFORMASJON",
  SYKMELDINGER = "SYKMELDINGER",
  SYKEPENGESOKNADER = "SYKEPENGESOKNADER",
  OPPFOELGINGSPLANER = "OPPFOELGINGSPLANER",
  HISTORIKK = "HISTORIKK",
  VEDTAK = "VEDTAK",
}

export type Menypunkt = {
  navn: string;
  sti: string;
  menypunkt: Menypunkter;
};