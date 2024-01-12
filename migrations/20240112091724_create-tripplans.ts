import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tripplans", (table) => {
    table.increments("id");
    table.string("name", 256);
    table.string("description", 2048);
    table.string("carparkname", 2048);
    table.string("carparklink", 2048);
    table.string("capacity", 2048);
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tripplans");
}
