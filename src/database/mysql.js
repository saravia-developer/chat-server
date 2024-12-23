import knex from 'knex';
import { env } from '../config/env.js';

class MYSQL {
  db 

  constructor(){
    this.db = knex({
      client: 'mysql2',
      connection: {
        host: env.database.host,
        port: env.database.port,
        user: env.database.user,
        password: env.database.password,
        database: env.database.database,
      }
    });

    this.testDBConnection()
  }

  testDBConnection() {
    this.db.raw('SELECT 2+2 as result')
      .then(([[{ result }]]) => {
        console.log(`App connected DB, test result: ${result}`)
      })
      .catch((err) => {
        console.error(`App no connected DB: ${err}`)
      })
  }
}

export const database = new MYSQL().db