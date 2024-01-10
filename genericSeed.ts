import { Knex } from "knex";

export async function seedData(
  knex: Knex,
  table: string,
  filter: object,
  extraData: object
): Promise<void> {
  let row = await knex(table).where(filter).select("id").first();
  if (row) {
    await knex(table).where(row).update(extraData);
    return row.id;
  }
  let rows = await knex(table)
    .insert({ ...filter, ...extraData })
    .returning("id");
  return rows[0].id;
}
