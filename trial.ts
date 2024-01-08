import { knex } from './db'

async function main() {
    
}


main()
    .catch(e => console.error(e))
    .then(() => knex.destroy())