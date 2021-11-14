const app = require("./app");
const dotenv = require("dotenv");

// Include environment variabel
dotenv.config({ path: "./.env" });

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
