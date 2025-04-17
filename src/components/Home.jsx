import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import {ProductContext} from '../utils/Context';
import Loading from "./Loading";
import axios from "../utils/axios";
const Home = () => {
  const [products] = useContext(ProductContext);
  const{search} =useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredproducts,setfilteredproducts] = useState(null);
  /*const getproductcategory = async ()=>{
    try{
      const {data} = await axios.get(`/products/category/${category}`);
      setfilteredproducts(data);
    }
    catch(error){
      console.log(error);
    }
  }*/
  useEffect(()=>{
  if(!filteredproducts || category == "undefined")  setfilteredproducts(products);
  if(category !="undefined"){ 
    //getproductcategory();
    setfilteredproducts(products.filter(p => p.category == category));
  }
},[category,products]);

  return products ? (
    <>
    <Nav />
    
      <div className=" w-[85%] p-10  pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">

        {filteredproducts && filteredproducts.map((p,i) =>(
        <Link key = {p.id}to={`/details/${p.id}`} className="flex mr-3 mb-3 flex-col p-3 justify-center items-center card  w-[18%] h-[30vh] border shadow rounded">
        <div className="mr-3 mb-3 hover:scale-110 w-full h-[80%] 
         bg-contain bg-no-repeat bg-center"
         style = {{
          backgroundImage:`url(${p.image})`,}}> </div>
        <h1 className="hover:text-blue-300">{p.title}</h1>
      </Link>
    ))}
        
      </div>
    
    </>
  ) : (
    <Loading />
  );
  
};

export default Home;
