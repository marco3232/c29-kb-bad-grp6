import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("rentals", (table) =>{
        table.increments("id");
        table.date("start_date");
        table.date("end_date");
        table.integer("insurance_charge");
        table.integer("car_id").unsigned().unique();
        table.foreign("car_id").references("cars.id");
        table.integer("user_id").unsigned().unique();
        table.foreign("user_id").references("users.id");
        table.timestamps(false,true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("rentals");
}

