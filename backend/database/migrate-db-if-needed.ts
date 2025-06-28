import {deleteDatabaseAsync, SQLiteDatabase} from "expo-sqlite";
import CreateGameTable from "./migrations/create-game-table";
import CreateGroupsTable from "./migrations/create-groups-table";
import CreateItemsTable from "@/backend/database/migrations/create-items-table";

type Migration = { id: number, title: string, date_exec: number };

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  await db.execAsync(`PRAGMA foreign_keys = ON;`)

  let version = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );

  if (!version) {
    throw new Error("Missing version ");
  }

  const {user_version: currentDbVersion} = version;

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE migrations (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL, 
          date_exec INTEGER
        );
      `);
  }

  const tables = await db.getAllAsync<any>(`SELECT * FROM sqlite_master;`)
  console.log(`all tables: `);
  tables.forEach(table => console.log(table.name))

  const migrations = {
    "create-game-table": new CreateGameTable(),
    "create-groups-table": new CreateGroupsTable(),
    "create-items-table": new CreateItemsTable(),
  };

  async function runMigration() {
    const ranMigrations = await db.getAllAsync<Migration>(`SELECT * FROM migrations`);

    console.log(`all migrations: `);
    ranMigrations.forEach((migration) => console.log(migration.title))

    await db.withTransactionAsync(async () => {
      try {
        for (const [key, value] of Object.entries<any>(migrations)) {
          if (ranMigrations.find((r) => r.title === key)) {
            continue;
          }

          await value.up(db);

          await db.execAsync(`
            INSERT INTO migrations(title, date_exec)
            VALUES ('${key}', ${new Date().getTime()})
          `)
        }
      } catch (e) {
        console.error(e);
      }
    })
  }

  async function revertMigrations() {
    const ranMigrations = await db.getAllAsync<Migration>(`SELECT * FROM migrations`);

    console.log(`all migrations: `);
    ranMigrations.forEach((migration) => console.log(migration.title))

    await db.withTransactionAsync(async () => {
      try {
        for (const [key, value] of Object.entries<any>(migrations)) {
          if (!ranMigrations.find((r) => r.title === key)) {
            continue;
          }

          await value.down(db);

          await db.execAsync(`
            DELETE FROM migrations WHERE title = '${key}';
        `)
        }
      } catch (e) {
        console.error(e);
      }
    })
  }


  async function init() {
    await db.execAsync(`INSERT INTO games(title, character) VALUES('test', 'test');`)
    await db.execAsync(`INSERT INTO groups(game_id, title) VALUES(1, 'test');`)
    await db.execAsync(`INSERT INTO groups(game_id, title) VALUES(1, 'test2');`)
    await db.execAsync(`INSERT INTO items(game_id, name, description) VALUES(1, 'test', 'test');`)
    await db.execAsync(`INSERT INTO items_j_groups(item_id, group_id, items_count) VALUES(1, 1, 1);`)
    await db.execAsync(`INSERT INTO items_j_groups(item_id, group_id, items_count) VALUES(1, 2, 1);`)
  }
  await runMigration();
  // await init();
  // await revertMigrations();
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}