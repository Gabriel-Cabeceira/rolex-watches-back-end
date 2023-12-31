import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "34.226.212.202",
    port: 3306,
    username: "cabeceiradev",
    password: "Senha123",
    database: "data-base-rolex",
    synchronize: false,
    logging: true,
    entities: [
        User
    ],
    migrations: ["./src/database/migrations/*{.ts,.js}"],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
