import React,{useEffect,useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import './Styles/table.css'
import * as ReactBootStrap from 'react-bootstrap'

interface user {
    id: number,
    name: string,
    trips: number,

    

}

export const TableData = () => {

const [data,setData]= useState<any[]>([]);
const [loading, setLoading] = useState<boolean>();

    
        useEffect(() => {
            // Use [] as second argument in useEffect for not rendering each time
            axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=10')
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setData( response.data.data);
                setLoading(true); 
            });
        },[]);
      /*   async function fetch(){
                const fetched= await axios.get("https://api.instantwebtools.net/v1/passenger?page=0&size=10");
                console.log(fetched);
                setData(fetched.data.data);
        };
        fetch();
      },[]); */

    return (
        <div>
            {loading ? ( <table>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Airline Name</th>
    <th>Trip</th>
  </tr>
  
      {data.map((get_it: any) =>
      <>
      <tr>
     
      <td>{get_it.airline.id}</td>
      <td>{get_it.name}</td>
      <td>{get_it.airline.name}</td>
      <td>{get_it.trips}</td>
      </tr>
        
      </>
      )
          
   }
    
 
    
</table>) : (<ReactBootStrap.Spinner animation="border" />)}
           
        </div>
    )
}