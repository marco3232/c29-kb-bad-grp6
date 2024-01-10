import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("cars", (table) =>{
        table.increments("id");
        table.string("car_plate",10);
        table.string("brand",20);
        table.string("model",20);
        table.integer("seats");
        table.string("transmission",5);
        table.string("image",2048);
        table.integer("rent_price");
        table.boolean("is_available");
        table.string("description",2048);
        table.timestamps(false,true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("cars");
}

