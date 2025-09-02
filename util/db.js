import * as  SQLite from "expo-sqlite";
import { Place } from "../models/place";


let database;

export async function init() {
  //OPEN DB (OR CREATE IF DOESN'T EXISTS)
  database = await SQLite.openDatabaseAsync('places.db');

  // ENABLE WAL MODE (OPTIONAL PERFORMACE OPTIMIZATION)
  await database.execAsync(`PRAGMA journal_mode = WAL;`);

  // CREATE TABLE
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);

  return database;
}

// INSERT PLACE
export async function insertPlace(place) {

  if (!database) {
    throw new Error('Database not initialized!');
  }

  await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`, 
    [
      place.title, 
      place.imageUri, 
      place.address, 
      place.location.lat, 
      place.location.lng
    ]
  );
};


export async function fetchPlaces() {
  if (!database) {
    throw new Error('Database not found | data not found');
  }

  const result = await database.getAllAsync(`SELECT * FROM places`);

  const places = [];
  for (const dp of result) {
    places.push(
      new Place(
        dp.title, 
        dp.imageUri, { 
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
        },
        dp.id,
      )
    );
  }

  return places;
};


export async function fetchPlaceDetails(id) {
  if (!database) {
    throw new Error('Database not found');
  }

  const result = await database.getAllAsync(`SELECT * FROM places WHERE id = ?`, [id]);

  const {title, imageUri, lat, lng, address} = result[0];
  return new Place(
    title,
    imageUri,
    {
      lat,
      lng, 
    },
    address,
    id,
  )
}



