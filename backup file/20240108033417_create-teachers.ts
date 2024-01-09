import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("email");
        table.string("password");
        table.integer("tel")
        table.timestamp("created_at");
        table.timestamp("updated_at");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

