import "./select.css"
import { ChangeEvent } from "react"

export interface IOptionType{
    id: number | string;
    title: string;
}

interface ISelectPropType {
    options?: IOptionType[],
    value: number | string,
    changeHundler: (value: number | string) => void
}

// Компонент селект
function Select( {options = [], value, changeHundler }: ISelectPropType ) {
    return ( 
        <label>
            <select value={value} onChange={( e: ChangeEvent<HTMLSelectElement> ) => {
                changeHundler(e.target.value)
            }}>
                <option hidden>
                    Не выбрано
                </option>
                {
                    options.map(option => {
                        return (
                            <option value={option.id} key={option.id}>
                                {
                                    option.title
                                }
                            </option>
                        )
                    })
                }
            </select>
        </label>
     );
}

export default Select;