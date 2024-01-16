import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { id: 1, brand_model: "Audi A3", seats: "5座位", transmission:"自動波", image:"./public/assests/1.car.png", rent_price:"$500", description:"出租前清洗乾淨及消毒車輛"},
        { id: 2, brand_model: "Toyota ALPHARD", seats: "7座位", transmission:"自動波", image:"./public/assests/2.car.png", rent_price:"$750", description:"出租前清洗乾淨及消毒車輛"},
        { id: 3, brand_model: "Ferrari F8", seats: "2座位", transmission:"自動波", image:"./public/assests/3.car.png", rent_price:"$1000", description:"出租前清洗乾淨及消毒車輛"},
    ]);
};
