import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("cars", (table) =>{
        table.increments("id");
        // table.string("car_plate",10);
        table.string("brand_model",50);
        // table.string("model",20);
        table.string("seats");
        table.string("transmission",5);
        table.string("image",2048);
        table.string("rent_price");
        // table.boolean("is_available");
        table.string("description",2048);
        table.timestamps(false,true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("cars");
}

