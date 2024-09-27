import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";
import { Server } from "http";
let server: Server;
async function main() {
  await mongoose.connect(config.mogodbUri as string);

  server = app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
  });
}

// eslint-disable-next-line no-console
main().catch((err) => console.log(err));

process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection is detected!!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log("Uncaught Exception is detected!!");
  process.exit(1);
});
