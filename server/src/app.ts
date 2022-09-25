import express, { application, Request, Response, } from "express"
import pool from "./db";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

export interface ITableType {
    id: number;
    title: string;
    date_created: Date;
    amount: number;
    distance: number;
  }
  
//функция разбивает записи на страницы и выдает нужную
function paginationHundle(arr: ITableType[], page: number){
    const pageCount =  Math.ceil(arr.length / 10);
    const result: ITableType[] = arr.splice(page * 10, 10)
    return {
        pageCount,
        result
    }
} 

// Запрос данных без фильтров
app.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const data = await pool.query("select * from test")
    const {pageCount, result}=  paginationHundle(data.rows, page);
    res.send({
        mess: "Данные",
        data: result,
        pageCount: pageCount
    })


    
})

// Запрос данных с фильтрами
app.get('/:criterion/:value/:column', async (req: Request, res: Response) => {
    const { criterion, value, column } = req.params
    const page = Number(req.query.page);
    
    try {
        if(criterion == "=="){
            //select * from test WHERE to_char(${column},'99999') LIKE '%${value}%' OR title LIKE '%${value}%'
            const data = await pool.query(`select * from test WHERE title LIKE '%${value}%'`)
            const {pageCount, result}=  paginationHundle(data.rows, page);
            return res.send({
                mess: "Данные",
                data: result,
                pageCount: pageCount
            })
        }
        if(parseInt(value, 10)){
            const data = await pool.query(`select * from test WHERE  ${column} ${criterion} ${value}`)
            const {pageCount, result}=  paginationHundle(data.rows, page);
            return res.send({
                mess: "Данные",
                data: result,
                pageCount: pageCount
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