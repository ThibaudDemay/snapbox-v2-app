interface GenData {
  text: string;
  value: string;
}

interface Data {
  tables: Array<GenData>;
  names: Record<string, Array<GenData>>;
}

const data: Data = {
  tables: [
    { text: "Honneur", value: "honneur" },
    { text: "Girafe", value: "girafe" },
    { text: "Capybara", value: "capybara" },
  ],
  names: {
    honneur: [
      { text: "Le Marié", value: "le-marie" },
      { text: "La Mariée", value: "la-mariee" },
    ],
    girafe: [
      { text: "Paul", value: "paul" },
      { text: "Jocelyne", value: "jocelyne" },
    ],
    capybara: [
      { text: "Kevin", value: "kevin" },
      { text: "Sandra", value: "sandra" },
    ],
  },
};

export default data;
