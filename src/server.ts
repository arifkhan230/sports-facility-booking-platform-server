import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";

async function main() {
  try {
    // connecting to the mongodb server
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        `Sports Facility Booking Platform server listening on port ${config.port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
