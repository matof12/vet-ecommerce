import { openDatabaseAsync } from 'expo-sqlite';
import { Platform } from 'react-native';

let db;

export const initDB = async () => {
  if (!db && Platform.OS !== 'web') {
    db = await openDatabaseAsync('vetecommerce.db');
  }
};

export const initLoginTable = async () => {
  await initDB();
  if (!db) return;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localId TEXT,
      email TEXT
    );
  `);
};

export const saveLogin = async (localId, email) => {
  await initDB();
  if (!db) return;

  await db.execAsync('DELETE FROM session;');
  await db.runAsync('INSERT INTO session (localId, email) VALUES (?, ?);', [
    localId,
    email,
  ]);
};

export const getLogin = async () => {
  await initDB();
  if (!db) throw new Error('SQLite no disponible en esta plataforma');

  const rows = await db.getAllAsync('SELECT * FROM session LIMIT 1;');
  return rows.length > 0 ? rows[0] : null;
};

export const clearLogin = async () => {
  await initDB();
  if (!db) return;

  await db.execAsync('DELETE FROM session;');
};
