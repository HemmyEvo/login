import axios from 'axios';
import React, { useState } from 'react'
import { BiSolidUserAccount } from 'react-icons/bi';
import { BsKey } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [formvalue, setFormValue] = useState({username:'', password:'', confirmPassword:'', email:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('')

    const handleChange = (e) =>{
        setFormValue({...formvalue, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) =>{
        setMessage('')
        e.preventDefault();
        if(formvalue.password === formvalue.confirmPassword){
            const formData = {username:formvalue.username, email:formvalue.email, password:formvalue.password,};
            const res = await axios.post("../src/Backend/user.php",formData);
            if(res.data.success){
              const text = await res.text();
                setMessage(text.data.success);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
                
            }

        }
        else{
            setError('The Passwords are not the same')
        }
       
      
    }
    
  return (
    <div className='flex justify-center items-center'>
    <form onSubmit={handleSubmit} action="" className='bg-[#e2e2e2] mx-auto w-[332px] box-border shadow-xl rounded-lg ' method="POST">
       
        <h1 className='text-center font-semibold py-3 text-[29px] tracking-wider'>Create an account</h1>
        <div className="cont px-8">

        <h1>{message}</h1>
        <h1 className='text-[red]'>{error}</h1>

          <div className="user flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
            <p className='p-3  bg-[#adadad] text-white text-[20px]'><MdEmail/></p>
            <input type="email" placeholder='Input Email' name='email' className='py-2 w-full outline-none px-4 bg-transparent' onChange={handleChange} value={formvalue.email} required />
          </div>




          <div className="user flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
            <p className='p-3  bg-[#adadad] text-white text-[20px]'><BiSolidUserAccount/></p>
            <input type="text" placeholder='Input Username' name='username' className='py-2 w-full outline-none px-4 bg-transparent' onChange={handleChange} value={formvalue.username} required />
          </div>



          <div className="password flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
          <p className='p-3  bg-[#adadad] text-white text-[20px]'><BsKey/></p>
          <input type="password" name='password' placeholder='Create Password' className='h-full outline-none px-4 bg-transparent' onChange={handleChange} value={formvalue.password} required />
          </div>



          <div className="password flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
          <p className='p-3  bg-[#adadad] text-white text-[20px]'><BsKey/></p>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' className='h-full outline-none px-4 bg-transparent' onChange={handleChange} value={formvalue.confirmPassword} required />
          </div>


         
          <div className="btn-sec mt-12">
            <button type="submit" className='py-2 w-full flex items-center justify-center rounded-md text-white bg-[#adadad] '>Sign Up</button>
          </div>

          <div className="text text-center mb-4 mt-8">
            <p>Have an account? <span className='text-[blue] cursor-pointer'><NavLink to={'/'}>Login</NavLink></span></p>
            <p  className='text-[blue] cursor-pointer'>Forgot your password?</p>
          </div>
        </div>
    </form>
    </div>
  )
}

export default SignUp