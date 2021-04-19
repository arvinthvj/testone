import axios from 'axios';
import { useEffect } from 'react';
import Select from 'react-select';

var realfetcheddata: any[] =[]; 

export const AsyncDropDown =()=> {
    var realfetcheddata: any[] =[]; 
    useEffect(() => {
       dataFetch(0);
         
     }, [])

    const dataFetch=async(page :any)=>{
        const fetcheddata= await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=40`);
    realfetcheddata.push(...fetcheddata.data.data);
        console.log(realfetcheddata);
    }
    console.log(realfetcheddata);
   
     
    
     
     //console.log(aquaticCreatures);
    return (
      <div className="App">
        <Select
        //  options={aquaticCreatures}
        />
      </div>
    );
  }
  