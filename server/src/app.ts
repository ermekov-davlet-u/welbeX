import express, { application, Request, Response, } from "express"
import pool from "./db";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Запрос данных без фильтров
app.get('/', async (req: Request, res: Response) => {
    const data = await pool.query("select * from test")
    res.send({
        mess: "Данные",
        data: data.rows
    })
    
})

// Запрос данных с фильтрами
app.get('/:criterion/:value/:column', async (req: Request, res: Response) => {
    const { criterion, value, column } = req.params
    try {
        if(criterion == "=="){
            const data = await pool.query(`select * from test WHERE to_char(${column},'99999') LIKE '%${value}%'`)
            return res.send({
                mess: "Загрузка данных",
                data: data.rows,
                err: false
            })
        }
        if(parseInt(value, 10)){
            const data = await pool.query(`select * from test WHERE  ${column} ${criterion} ${value}`)
            return res.send({
                mess: "Загрузка данных",
                data: data.rows,
                err: false
            })
        }
        return res.send({
            mess: "Загрузка данных",
            data: [],
            err: false
        })
    } catch (error: any) {
        return res.send({
            mess: "Запрос с ошибкой",
            data: [],
            err: error.message
        })
    }
})

// Запускаем сервер на порту 3000
app.listen(3000, () => {
    console.log("Application listening on port 3000...");
})