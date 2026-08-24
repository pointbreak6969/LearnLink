import connectDb from "./db/db.js";
import "dotenv/config";

import { app } from "./app.js";
import { createServer } from "http";
import { seedSuperAdmin } from "./utils/seedSuperAdmin.js";

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

connectDb()
  .then(async () => {
    await seedSuperAdmin();
    httpServer.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB", error);
  });