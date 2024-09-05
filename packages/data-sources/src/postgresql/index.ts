import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from  'drizzle-orm/node-postgres';
import { migrate } from  'drizzle-orm/node-postgres/migrator';

export interface InitPostgresOptions {
    url?: string;
}

let dbInstace: any; 
export const initPostgres = async ({url}: InitPostgresOptions) => {

    const pool = new Pool({
        connectionString: url,
        ssl: {
            rejectUnauthorized: false
        }
    });

    const db = drizzle(pool);

    await migrate(db, {
        migrationsFolder: './migrations'
    });

    dbInstace = db;
    console.info(`Postgres connection`)
}

export const getDbInstance = () => dbInstace;