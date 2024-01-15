import { createKnex } from "./db";

let knex = createKnex();

type pythonDataType = {
  name: string;
  description: string;
  carpark_name: string;
  carpark_link: string;
  capacity: string;
};

type route = {
  id: number;
  places: pythonDataType[];
};

let route1: route = {
  id: 1,
  places: [
    {
      name: "八仙嶺",
      description: "...",
      carpark_name: "八仙嶺停車場",
      carpark_link: "https://www.google.com/maps/search/八仙嶺停車場",
      capacity: "約50個停車位",
    },
  ],
};

let route2: route = {
  id: 2,
  places: [
    {
      name: "香港迪士尼樂園",
      description: "...",
      carpark_name: "迪士尼停車場",
      carpark_link: "https://www.google.com/maps/search/迪士尼停車場",
      capacity: "約5000個停車位",
    },
  ],
};

let route3: route = {
  id: 3,
  places: [
    {
      name: "Other Place",
      description: "...",
      carpark_name: "Other Place Carpark",
      carpark_link: "https://www.google.com/maps/search/Other Place Carpark",
      capacity: "1000個停車位",
    },
  ],
};


const routes = [route1, route2, route3];

async function insertUser(routes:any) {
    for (const route of routes) {
      for (const place of route.places) {
        await knex("tripplans").insert({
          name: place.name,
          description: place.description,
          carparkname: place.carpark_name,
          carparklink: place.carpark_link,
          capacity: place.capacity,
        });
      }
    }
  }
  

  insertUser(routes);




  // async function insertUser() {
//   for (let entry of pythonData) {
//     await knex("tripplans").insert({
//       name: entry.name,
//       description: entry.description,
//       carparkname: entry.carpark_name,
//       carparklink: entry.carpark_link,
//       capacity: entry.capacity,
//     });
//   }
// }

// insertUser();