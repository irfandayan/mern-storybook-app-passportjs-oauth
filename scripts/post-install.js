import fs from "fs-extra";

try {
  fs.copySync("./config/config.env.example", "./config/config.env");
  console.log("Environment file created successfully.");
} catch (err) {
  console.error(err);
}
