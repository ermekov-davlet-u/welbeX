import { useState, useEffect, ChangeEvent } from "react";
import Select, { IOptionType } from "./components/Select";
import Table from './components/Table';

export interface ITableType {
  id: number;
  title: string;
  date_created: Date;
  amount: number;
  distance: number;
}

type strnum = number | string

function App() {
  //Основной рабочий стейт
  const [table, setTable] = useState<ITableType[]>([])
  // Поля фильтрации и методы их изменения
  const [ criterion, setCriterion ] = useState<strnum>(0)
  const [ column, setColumn ] = useState<strnum>(0)
  const [ searchText, setText ] = useState<string>("")

  function changeCriterion(value: strnum){
    setCriterion(value)
  }
  function changeColumn(value: strnum){
    setColumn(value)
  }
  //Данные для справочника
  const criterions: IOptionType[] = [
    {
      id: "=",
      title: "Равно"
    },
    {
      id: "==",
      title: "Содержить"
    },
    {
      id: "<",
      title: "Больше"
    },
    {
      id: ">",
      title: "Меньше"
    }
  ]
  //Данные для справочника
  const columns: IOptionType[] = [
    {
      id: "title",
      title: "По названию"
    },
    {
      id: "amount",
      title: "По количеству"
    },
    {
      id: "distance",
      title: "По расстоянию"
    }
  ]
  //функция получения данных с сервера
  const getTable =async (criterion?: strnum, column?: strnum, searchText?: string) => {
    if(
      criterion &&
      column &&
      searchText
    ){
      const tables: {
        mess: string;
        err: string | null;
        data: ITableType[]
      } = await fetch(`http://localhost:3000/${criterion}/${searchText}/${column}`)
        .then(res => res.json())
        .catch(err => {
          console.log(err);
          return []
        })
        setTable(tables.data);
      return
    }
    const tables: {
      mess: string;
      err: string | null;
      data: ITableType[]
    } = await fetch("http://localhost:3000")
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        return []
      })
    setTable(tables.data);
  }
 // По умолчанию все данные приходят
  useEffect(() => {
    getTable()
  }, [])

  return (
    <div className="App">
      <header>
        <Select options={criterions} changeHundler={changeCriterion} value={criterion} />
        <Select options={columns} changeHundler={changeColumn} value={column} />
        <input type="search" value={searchText} onInput={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }} className="form__input" id="name" placeholder="Значение" />
        {
          !!(
            criterion &&
            column &&
            searchText
          ) && 
          <input type="button" value="Фильтровать" className="form__input inp_btn" onClick={() => {
            getTable(criterion,column,searchText)
          }} />
        }
        <input type="button" value="Все" className="form__input inp_btn" onClick={() => {
          getTable()
        }} />
      </header>
      <Table table={table}/>
    </div>
  );
}

export default App;
