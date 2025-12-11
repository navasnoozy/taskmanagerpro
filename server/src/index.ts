// auth/src/index.ts

import { MongoDatabase } from "./config/db";
import { createApp } from "./app";
import { IDatabase } from "./interface/IDatabase";

const port = process.env.PORT || 3000;

const startServer = async (database: IDatabase) => {
  try {
    await database.connect();

    const app = await createApp();

    app.listen(port, () => {
      console.log("server running on", port);
    });

  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

const mongoUri = process.env.MONGO_URI!;
const database = new MongoDatabase(mongoUri);
startServer(database);
