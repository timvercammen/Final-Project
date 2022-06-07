const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "",
  },
});

export default knex;

var NestHydrationJS = require("nesthydrationjs")();
export const nest = NestHydrationJS.nest;
