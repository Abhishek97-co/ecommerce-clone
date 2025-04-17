
import React, { useContext, useEffect, useState } from 'react'
import{ProductContext} from '../utils/Context'
import {nanoid} from "nanoid"
import { useNavigate, useParams } from 'react-router-dom'
import { stringify } from 'postcss'

const Edit = () => {
    const [products,setproducts] =  useContext(ProductContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setproduct] = useState({
        title:'',
        image:'',
        price:'',
        description:'',
        category:''
    });
    const Changehandler =(e) => {


        setproduct({...product,[e.target.name]:e.target.value});

    }

    useEffect(()=>{
        setproduct(products.filter((p)=>p.id == id)[0]);

    },[id]);
    const AddProductHandler = (e) => {
        e.preventDefault();
        if(product.title.trim().length < 5 || product.image.trim().length < 5 ||
         product.category.trim().length < 5 || product.price.trim().length < 1 || 
         product.description.trim().length < 5
        ){
            alert('Every input must have atleast four characters')
            return;
        }
        const pi = products.findIndex((p)=>p.id == id);
        const copydata = [...products];
        copydata[pi] = {...products[pi],...product};
        setproducts(copydata);
        localStorage.setItem("products", JSON.stringify(copydata));
        navigate(-1);
        
        //setproducts([...products, product]);
        //localStorage.setItem("products", JSON.stringify([...products, product])); 
        
        navigate("/"); 
    };
  return (
    <form onSubmit={AddProductHandler} className='p-[5%] flex flex-col items-center w-screen h-screen'>
        <h1 className='w-1/2 mb-5 text-3xl'>Edit Product </h1>
        <input type='url' placeholder='image-link'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={ Changehandler}
        name = "image"
        value = {product && product.image}
        />
        <input type='text' placeholder='title'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={ Changehandler}
        name = "title"
        value = {product && product.title}
        />
        <div className='w-1/2 flex justify-between'>
        <input type='text' placeholder='category'
        className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3'
        onChange={ Changehandler}
        name = "category"
        value = {product && product.category}
        />
        <input type='numbers' placeholder='price'
        className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3'
        onChange={ Changehandler}
        name = "price"
        value = {product && product.price}
        />
        </div>
        <textarea
            className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={ Changehandler}
            name = "description"
            placeholder="Enter product description here"
            value={product && product.description}
            rows='10'
        />
        <div className='w-1/2'>
        <button className=' self-start py-2 px-5 border rounded border-blue-200 text-blue-300'
          >Added Product</button>
        </div>

        
    </form>
  )
  
}

export default Edit