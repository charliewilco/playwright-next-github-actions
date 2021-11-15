import mongoose from "mongoose";

const url = process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/next-js-demo";

interface IConnectionStatus {
  isConnected?: number;
}

const connection: IConnectionStatus = {}; /* creating connection object*/

export async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(url);

  connection.isConnected = db.connections[0].readyState;
}
