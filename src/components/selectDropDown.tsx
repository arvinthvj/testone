import React, { useEffect, useState } from "react";


import { AsyncPaginate } from "react-select-async-paginate";

 export  const SelectDropDown=()=>{
  const loadOptions = async (searchQuery: any, loadedOptions: any, { page }: any) => {
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=40`
    );
    const responseJSON = await response.json();
    console.log(responseJSON);

    return {
      options: responseJSON.data,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };
  const [selected,setSelected]=useState<any>([]);

  const onChange = (options: React.SetStateAction<never[]>) => {
   
      setSelected(options);
    
  };

  
  const promiseOptions = (inputValue: any) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

  return (
    <>
    <AsyncPaginate
    isMulti
    cacheOptions
    defaultOptions
    // loadOptions={promiseOptions}
      
      loadOptions={loadOptions}
      getOptionValue={(options) => options.name}
      getOptionLabel={(options) => options.name}
      onChange={onChange}
      isSearchable={false}
      placeholder="Select name"
      additional={{
        page: 1,
      }}
    />

    <div>
{selected.map((data : any)=>(
<>
<p>{data._id}</p>
<p>{data.name}</p>
</>
))

}
    </div>
    </>
  );
};

function filterColors(inputValue: any): unknown {
  throw new Error("Function not implemented.");
}

