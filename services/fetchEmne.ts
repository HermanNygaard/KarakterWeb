let payload = {
    tabell_id: 308,
    api_versjon: 1,
    statuslinje: "N",
    begrensning: "1000",
    kodetekst: "N",
    desimal_separator: ".",
    groupBy: ["Institusjonskode", "Emnekode", "Karakter", "Årstall"],
    sortBy: ["Karakter"],
    filter: [
      {
        variabel: "Institusjonskode",
        selection: { filter: "item", values: ["1110"] }
      },
      {
        variabel: "Emnekode",
        selection: {
          filter: "item",
          values: ["in1010-1"]
        }
      },
      {
        variabel: "Årstall",
        selection: {
          filter: "item",
          values: [`2019`]
        }
      }
    ]
  };

export default payload
