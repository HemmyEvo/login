import React, { useEffect, useState } from 'react'
import { BiSolidUserAccount } from 'react-icons/bi';
import { BsKey } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';



const SignIn = () => {

    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formvalue, setFormValue] = useState({username:'', password:''});
    const navigate = useNavigate();

    useEffect(()=>{
        const getUserData = async ()=>{
            const reqData = await fetch('../src/Backend/user.php');
            const res = await reqData.json();
           
            setUserData(res);
        }
        getUserData();
    },[])

    const handleChange = (e) =>{
        setFormValue({...formvalue, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const username = userData.find((user) => user.email === formvalue.username || user.username === formvalue.username);
        const password =  userData.find((user) =>user.password === formvalue.password);
        console.log(username)
        if(username && password){
            setError('')
            setMessage('Login Successful')
            setTimeout(() => {
                navigate('/home')
            }, 3000);
        }
        else{
            setError('Invalid Address !!!')
        }

    }
  return (
    <div className='flex justify-center items-center'>
    <form onSubmit={handleSubmit} action="" className='bg-[#e2e2e2] mx-auto w-[332px] box-border shadow-xl rounded-lg ' method="POST">
        <h1 className='text-center font-semibold py-3 text-[29px] tracking-wider'>Login</h1>
        <div className="cont px-8">
            <h1>{message}</h1>
            <h1 className='text-[red]'>{error}</h1>
          <div className="user flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
            <p className='p-3  bg-[#adadad] text-white text-[20px]'><BiSolidUserAccount/></p>
            <input type="text" name='username' placeholder='Username or Email' className='py-2 w-full outline-none px-4 bg-transparent' onChange={handleChange} required />
          </div>
          <div className="password flex items-center bg-[#d1d1d1] shadow-lg rounded-l-[7px] overflow-hidden mt-7  rounded">
          <p className='p-3  bg-[#adadad] text-white text-[20px]'><BsKey/></p>
          <input type="password" name='password' placeholder='Enter Password' className='h-full outline-none px-4 bg-transparent' onChange={handleChange} required />
          </div>
          <div className="remember-me flex items-center space-x-3 text-[#818181] mt-6 px-2">
            <input type="checkbox" name="remember_me" id="rem" />
            <label htmlFor='rem'>Remember me</label>
          </div>
          <div className="btn-sec mt-12">
            <button type="submit" className='py-2 w-full flex items-center justify-center rounded-md text-white bg-[#adadad] '>Login</button>
          </div>

          <div className="text text-center mb-4 mt-8">
            <p>Don't have an account? <span className='text-[blue] cursor-pointer'><NavLink to={'/sign-up'}>Sign up</NavLink></span></p>
            <p  className='text-[blue] cursor-pointer'>Forgot your password?</p>
          </div>
        </div>
    </form>
    </div>
  )
}

export default SignIn