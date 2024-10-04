import { app } from "./app.js";
import { connectDB } from "./DB/index.js";
import http from "http";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`server is listening on PORT ${process.env.PORT || 8000}`);
  });
});
