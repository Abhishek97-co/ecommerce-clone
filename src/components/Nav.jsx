import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';

const Nav = () => {
  const [products] = useContext(ProductContext)

  let diistinct_category = products && products.reduce((acc, cv) => [...acc, cv.category],[]);
  diistinct_category = [...new Set(diistinct_category)];
  const color =() =>{
    return `rgba(${(Math.random()*255).toFixed()},
    ${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()})`;
  };
  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5" >
        
    <a className='py-2 px-5 border rounded border-blue-200 text-blue-300' href="/create">Add New Product</a>
    <hr className='w-full'/>
    <h1 className='text-2xl font-regular mb-3 w-[80%] '>Category Filter</h1>
    <div className=' w-[80%]'>
      {diistinct_category.map((c,i)=>(
        <Link key={i} to={`/?category=${c}`} className=' flex items-center  mb-3'>
        <span style={{backgroundColor: color()}} className='rounded-full mr-2 block w-[15px] h-[15px] bg-blue-100'></span>{c}
      </Link>
      ))}
      
     
     
    </div>
  </nav>
  )
}

export default Nav