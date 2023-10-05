type stateobj = {
  name: string;
  abv: string;
  alt?: string;
};
export const states: stateobj[] = [
  {
    name: "New South Wales",
    abv: "NSW",
    alt: "NS",
  },

  { name: "Northern Territory", abv: "NT" },
  { name: "Queensland", abv: "Qld", alt: "QL" },
  { name: "South Australia", abv: "SA" },
  { name: "Tasmania", abv: "Tas", alt: "TS" },
  { name: "Victoria", abv: "Vic", alt: "VI" },
  { name: "Western", abv: "Australia", alt: "WA" },
  { name: "Australian Capital Territory", abv: "ACT" },
  { name: "Northern Territory", abv: "NT" },
  { name: "Jervis Bay Territory", abv: "NSW" },
];
