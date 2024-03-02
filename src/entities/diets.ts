export interface Diet {
  label: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
}

export const diets: Diet[] = [
  {
    label: "Equilibré",
    carbohydrates: 35,
    proteins: 30,
    fats: 35,
  },
  {
    label: "Prise de masse",
    carbohydrates: 50,
    proteins: 40,
    fats: 10,
  },
  {
    label: "Cétogène",
    carbohydrates: 10,
    proteins: 40,
    fats: 50,
  },
  {
    label: "Hyperproteinés",
    carbohydrates: 10,
    proteins: 65,
    fats: 25,
  },
  {
    label: "Sportif de haut niveau",
    carbohydrates: 50,
    proteins: 30,
    fats: 20,
  },
];
