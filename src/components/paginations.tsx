import React, { useMemo, useState, useEffect} from 'react'
import { useTable, usePagination } from 'react-table'
import './Styles/table.scss'
import axios, { AxiosResponse} from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import  InfiniteScroll from 'react-infinite-scroll-component';


export const Paginations = () => {

    /* export */ const COLUMNS = [ 
        {
          Header:'Pasenger',
          columns: [
            {
              Header:'Id',
              accessor: '_id'
          },
          {
              Header:'Name',
              accessor: 'name'
          },
          {
              Header:'Trips',
              accessor: 'trips'
          }
          ]
        },
       {
         Header: 'Airline',
         columns: [
          {
            Header:'Id',
            accessor: 'airline.id'
        },
        {
            Header:'Name',
            accessor: 'airline.name'
        },
        {
            Header:'Country',
            accessor: 'airline.country'
        }
         ]
       }
    ]

    interface Iuser {
      id: number,
      name: string,
      trips: number,
    }
    
  const columns: any = useMemo(() => COLUMNS, [])
  

  const [data,setData]= useState<Iuser[]>([]);
     
  const [pageChange, setpageChange] = useState<number>(0)
  const [pageNo, setPageNo]= useState<number>(15);
  const [realPg,setRealPg]=useState<any>(0);
  const [sizePg, setSizePg] = useState<number>(pageNo);
  const [loading, setLoading] = useState<boolean>(false);
        useEffect(() => {
          const onLoad=()=> {setPageSize(7500)};
          onLoad();
          setLoading(true);
            axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageChange}&size=${sizePg}`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setData( response.data.data);
                setRealPg(response.data);
                setLoading(false);
                setSizePg((prev)=>prev+15);
            });
           
            
        },[pageChange] );

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    /* nextPage,
    previousPage,
    
    pageOptions,
    
    pageCount, */
    canNextPage,
    canPreviousPage,
    gotoPage,
    rows,
    setPageSize,
    /* state, */
    prepareRow
  }: any = useTable({
    columns,
    data
  }, usePagination)
  /* const { pageIndex } = state */
console.log(page)
  return (
    <>
    {/* <ReactBootStrap.Spinner animation="border" /> */}
   <><InfiniteScroll
             dataLength={rows.length}
             next={()=> setpageChange(pageChange + 1)}
             hasMore={pageChange===realPg.totalPages-1 ? false : true}
             loader={ loading && <h2>LOADING...</h2> }
           >{
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))} 
        </thead>
        <div className='loading'>{loading ? ( <ReactBootStrap.Spinner animation="border" />  ) : (null)}</div>
        
         <tbody {...getTableBodyProps()}>
         
         { rows.map((row: any) => {
           prepareRow(row)
           return (
             
             <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
               })}
             </tr>
           )
         })}
       </tbody>
      
      </table>}</InfiniteScroll></>
      <div className='button'>
        <span>
          <em>Page</em> {' '} <strong>
            {pageChange + 1} of {realPg.totalPages}
          </strong> {' '}
        </span>
       {console.log(realPg.totalPages)}{'    '}
       
         {/*  <div><button onClick= {()=> setpageChange(realPg.totalPages - (realPg.totalPages))} disabled= {(pageChange===0)}>{'<<'}</button> </div>{'    '}
          <div><button onClick= {()=>setpageChange(pageChange - 1)} disabled= {(pageChange===0)}>Previous</button>{'    '}</div>
          <div><button onClick= {()=> setpageChange(pageChange + 1)} disabled= {(pageChange===realPg.totalPages-1)}>Next</button>{'    '}</div>
          <div><button onClick= {()=> setpageChange(realPg.totalPages-1)} disabled= {(pageChange===realPg.totalPages-1)}>{'>>'}</button></div> */}
      </div>
    </>
  )
}