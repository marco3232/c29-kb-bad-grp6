import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("rent_historys", (table) =>{
        table.integer("user_id").unsigned().unique();
        table.foreign("user_id").references("users.id");
        table.integer("rental_id").unsigned().unique();
        table.foreign("rental_id").references("rentals.id");
        table.timestamps(false,true);
      });
    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("rent_historys");
}

