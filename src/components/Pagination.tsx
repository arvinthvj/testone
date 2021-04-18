import React, { useMemo, useState, useEffect} from 'react'
import { useTable, usePagination } from 'react-table'
import './Styles/table.css'
import axios, { AxiosResponse} from 'axios'


export const Pagination = () => {

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
  /* const data: any = useMemo(() => MOCK_DATA, []) */

  const [data,setData]= useState<Iuser[]>([]);
  const [pageNo, setPageNo]= useState<number>();


    
        useEffect(() => {
            axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=50`)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setData( response.data.data);
                console.log(`https://api.instantwebtools.net/v1/passenger?page=${setPageNo}&size=50`)
            });
        },[]);

 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow
  }: any = useTable({
    columns,
    data
  }, usePagination)
  const { pageIndex } = state
  setPageNo: Number= pageIndex+1

  return (
    <>
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
        <tbody {...getTableBodyProps()}>
          { page.map((row: any) => {
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
        
      </table>
      <div>
        <span>
          <em>Page</em> {' '} <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong> {' '}
        </span>
          <button onClick= {()=> gotoPage(0)} disabled={(!canPreviousPage)}>{'<<'}</button>
          <button onClick= {()=> previousPage()} disabled= {(!canPreviousPage)}>Previous</button>
          <button onClick= {()=> nextPage()} disabled= {(!canNextPage)}>Next</button>
          <button onClick= {()=> gotoPage(pageCount - 1)} disabled={(!canNextPage)}>{'>>'}</button>
      </div>
    </>
  )
}