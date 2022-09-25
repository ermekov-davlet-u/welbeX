
import { useState, useEffect } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs"
// Компонент погинации 
function Navigation( { max, getTable }: { max: number, getTable: (pageNum: number) => void } ) {
    
    const [ page, setPage ] = useState<number>(1)

    const incPage = () => {
        if(page >= max)return
        setPage(page + 1)
    }
    const decPage = () => {
        if(page <= 1) return
        setPage(page - 1)
    }

    useEffect(() => {
        getTable(page)
      }, [page])

    return ( 
        <div className='pagination'>
            <button className="pagination_btn" onClick={decPage}>
                <BsFillArrowLeftSquareFill/>
            </button>

            <div className="pagination_current">
                {
                    page
                }
            </div>

            <button className="pagination_btn" onClick={incPage}>
                <BsFillArrowRightSquareFill/>
            </button>
        </div>
     );
}

export default Navigation;