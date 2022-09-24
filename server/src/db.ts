import { Pool } from "pg";
// Соединение с базой
const pool = new Pool({
    user: "postgres",
    password: "Ваш пароль",
    host: "localhost",
    port: 5432,
    database: "База данных"
})

export default pool