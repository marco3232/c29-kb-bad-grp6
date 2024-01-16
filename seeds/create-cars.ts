import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: 1,
      brand_model: "Audi RS3",
      seats: "5座位",
      transmission: "自動波",
      image: "/assests/carhtml/Audi_RS3.png",
      rent_price: "$500",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 2,
      brand_model: "TOYATA Alphard",
      seats: "7座位",
      transmission: "自動波",
      image: "/assests/carhtml/Toyota_Alphard.png",
      rent_price: "$750",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 3,
      brand_model: "BMW Z4 23IA",
      seats: "2座位",
      transmission: "自動波",
      image: "/assests/carhtml/BMW_Z4_23IA.png",
      rent_price: "$500",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 4,
      brand_model: "MERCEDES-BENZ SLK250",
      seats: "2座位",
      transmission: "自動波",
      image: "/assests/carhtml/MERCEDES-BENZ SLK250.png",
      rent_price: "$500",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 5,
      brand_model: "Ferrari F8",
      seats: "2座位",
      transmission: "自動波",
      image: "/assests/carhtml/Ferrari_F8_spider.png",
      rent_price: "$1000",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 6,
      brand_model: "Land Rover Discovery Sport",
      seats: "7座位",
      transmission: "自動波",
      image: "/assests/carhtml/Land_Rover_Discovery_Sport_7Seater.png",
      rent_price: "$750",
      description: "出租前清洗乾淨及消毒車輛",
    },
    {
      id: 7,
      brand_model: "LAMBORGHINI LP610-4",
      seats: "2座位",
      transmission: "自動波",
      image: "/assests/carhtml/LAMBORGHINI LP610-4.png",
      rent_price: "$1000",
      description: "出租前清洗乾淨及消毒車輛",
    },
  ]);
}
