import React, { useMemo, useState, useEffect} from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
/* import { COLUMNS } from './column' */
import 'table.css'
import axios, { AxiosResponse} from 'axios'


export const Table = () => {

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

    interface Iuser{
      id: number,
      name: string,
      trips: number
    }
    
  const columns: any = useMemo(() => COLUMNS, [])
  /* const data: any = useMemo(() => MOCK_DATA, []) */

  const [data,setData]= useState<Iuser[]>([]);

    
        useEffect(() => {
            axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=500')
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setData( response.data.data);
            });
        },[]);

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
   
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        
      </table>
    </>
  )
}