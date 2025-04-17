import React, { useContext, useState } from 'react'
import{ProductContext} from '../utils/Context'
import {nanoid} from "nanoid"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {
    const navigate = useNavigate();
   const [products,setproducts] =  useContext(ProductContext);
    const[title,settitle] = useState('');
    const[image,setimage] = useState('');
    const[price,setprice] = useState('');
    const[description,setdescription] = useState('');
    const[category,setcategory] = useState('');
    const AddProductHandler = (e) => {
        e.preventDefault();
        if(title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 1 || 
            description.trim().length < 5
        ){
            alert('Every input must have atleast four characters')
            return;
        }
        
        const product = {
            id: nanoid(),
            title,
            image,
            price,
            description,
            category
        };
        localStorage.setItem("products", JSON.stringify([...products, product])); 
        
        
        setproducts([...products, product]);
        toast.success("product added successfully");
       
        
        navigate("/"); 
    };
  return (
    <form onSubmit={AddProductHandler} className='p-[5%] flex flex-col items-center w-screen h-screen'>
        <h1 className='w-1/2 mb-5 text-3xl'>Add New Product</h1>
        <input type='url' placeholder='image-link'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={(e)=> setimage(e.target.value)}
        value = {image}
        />
        <input type='text' placeholder='title'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        onChange={(e)=> settitle(e.target.value)}
        value = {title}
        />
        <div className='w-1/2 flex justify-between'>
        <input type='text' placeholder='category'
        className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3'
        onChange={(e)=> setcategory(e.target.value)}
        value = {category}
        />
        <input type='numbers' placeholder='price'
        className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3'
        onChange={(e)=> setprice(e.target.value)}
        value = {price}
        />
        </div>
        <textarea
            className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter product description here"
            value={description}
            rows='10'
        />
        <div className='w-1/2'>
        <button className=' self-start py-2 px-5 border rounded border-blue-200 text-blue-300'
          >Add New Product</button>
        </div>

        
    </form>
  )
}

export default Create