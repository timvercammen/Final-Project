const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "",
    port: ,
    user: "",
    password: "",
    database: "",
  },
});

export default knex;

var NestHydrationJS = require("nesthydrationjs")();
export const nest = NestHydrationJS.nest;
