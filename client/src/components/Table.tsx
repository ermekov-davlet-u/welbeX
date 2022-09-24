import { ITableType } from "../App";

interface ITablePropType{
    table: ITableType[]
}

// Таблица вывода данных
function Table({ table }: ITablePropType ) {
    return ( 
        <table className="container">
            <thead>
                <tr>
                    <th><h1>Название</h1></th>
                    <th><h1>Дата</h1></th>
                    <th><h1>Количество</h1></th>
                    <th><h1>Расстояние</h1></th>
                </tr>
            </thead>
            <tbody>
            {
                table.map(item => {
                return (
                    <tr key={item.id}>
                    <td>
                        {
                        item.title
                        }
                    </td>
                    <td>
                        {
                        new Date(item.date_created).toLocaleDateString()
                        }
                    </td>
                    <td>
                        {
                        item.amount
                        }
                    </td>
                    <td>
                        {
                        item.distance
                        }
                    </td>
                    </tr>
                )
                })
            }
            </tbody>
        </table>
     );
}

export default Table;