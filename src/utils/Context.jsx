import React, { createContext, useEffect, useState } from 'react'
import axios from './axios';

export const ProductContext = createContext();

const Context = (props) => {
   

    const [products, setproducts] = useState(
      JSON.parse(localStorage.getItem("products")) || []
  );

  const getproducts = async () => {
      
      if (!products.length) {
          try {
              const { data } = await axios("/products");
              setproducts(data);
              
              localStorage.setItem("products", JSON.stringify(data));
          } catch (error) {
              console.log(error);
          }
      }
  };

  useEffect(() => {
      getproducts();
  }, []);


  return (

    <ProductContext.Provider value ={[products,setproducts]}>
            {props.children}
    </ProductContext.Provider>
      
    
  )
}

export default Context