import { useState, useEffect, ChangeEvent } from "react";
import Select, { IOptionType } from "./components/Select";
import Table from './components/Table';
import Navigation from './components/Navigation';

export interface ITableType {
  id: number;
  title: string;
  date_created: Date;
  amount: number;
  distance: number;
}

type result = {
  mess: string;
  err: string | null;
  data: ITableType[],
  pageCount: number
}

type strnum = number | string

function App() {
  //Основной рабочий стейт
  const [table, setTable] = useState<ITableType[]>([])
  const [maxPage, setMaxPage] = useState<number>(0)
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
      id: ">",
      title: "Больше"
    },
    {
      id: "<",
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
  const getTable =async (pageNum: number) => {
    if(
      criterion &&
      column &&
      searchText
    ){
      const tables: result = await fetch(`http://localhost:3000/${criterion}/${searchText}/${column}?page=${--pageNum}`)
        .then(res => res.json())
        .catch(err => {
          console.log(err);
          return []
        })
        setTable(tables.data);
        setMaxPage(tables.pageCount)
      return
    }
    const tables: result = await fetch(`http://localhost:3000/?page=${--pageNum}`)
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        return []
      })
    setTable(tables.data);
    setMaxPage(tables.pageCount)
  }
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
            getTable(1)
          }} />
        }
        <input type="button" value="Все" className="form__input inp_btn" onClick={() => {
          getTable(1)
        }} />
      </header>
      <Table table={table}/>
      <Navigation max={maxPage} getTable={getTable} />
    </div>
  );
}

export default App;
