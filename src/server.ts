import app from "./index";
import * as dotenv from "dotenv";
import config from "./config/config";
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
