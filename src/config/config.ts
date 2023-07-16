import { merge } from "lodash";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.stage || "local";

let envConfig;

if (stage == "production") {
  envConfig = require("./prod").default;
} else if (stage == "development") {
  envConfig = require("./dev").default;
}

export default merge(
  {
    port: 3000,
  },
  envConfig
);
