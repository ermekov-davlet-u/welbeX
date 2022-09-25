import { Pool } from "pg";
// Соединение с базой
const pool = new Pool({
    user: "postgres",
    password: "Пароль",
    host: "localhost",
    port: 5432,
    database: "Название базы"
})

export default pool