import React, { useState } from 'react'
import loginsignupImage from "../assest/login-animation.gif"
import {BiHide, BiShow} from "react-icons/bi"
import { Link } from 'react-router-dom';
import {BsEmojiSmileupsideDown} from 'react-icons/bs'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const  Login = ()=> {
  const[showPassword , setshowPassword] = useState(false);
  const [data,setData]= useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const userData = useSelector(state=>state)
  

  const dispatch = useDispatch()

  const handleshowPassword = () =>{
    setshowPassword(preve=>!preve)
  }
  
  const handleOnChange = (e) =>{
    const {name , value} = e.target;
    setData((preve)=>{
      return{
        ...preve,
        [name]: value,
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {email,password} = data
    if(email && password ){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      console.log(dataRes)
      toast(dataRes.message)
      
      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

      console.log(userData)
    }
    else{
        alert("Please Enter required fields")
    }
  }
  return (
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
      {/*<h1 className='text-center text-2xl font-bold'>Signup</h1>*/}
      <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
        <img src={loginsignupImage} className='w-full'/>
      </div>

      <form className='w-full py-1 flex flex-col' onSubmit={handleSubmit}>
  
      <label htmlFor='email'>Email</label>
      <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}/>

      <label htmlFor='password'>Password</label>
      <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-1 focus-within:outline  focus-within:outline-blue-300'>
      <input type={showPassword?"text":'password'} id='password' name='password' className='bg-slate-200 w-full border-none outline-none' value={data.password} onChange={handleOnChange}/>
      <span className='flex text-xl cursor-pointer' onClick={handleshowPassword}>{showPassword?<BiShow/> : <BiHide/>}</span>
      </div>

      <button className='max-w-[140px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full mt-3'>Login</button>
      </form>

      <p>Do not have an account? <Link to={"/Signup"} className='text-red-600 underline'>Sign up Here</Link></p>
    </div>
    </div>
  )
}

export default Login