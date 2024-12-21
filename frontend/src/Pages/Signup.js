import React, { useState } from 'react'
import loginsignupImage from "../assest/login-animation.gif"
import {BiHide, BiShow} from "react-icons/bi"
import { Link,useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../Utility/imagetoBase64';
import { toast } from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const[showPassword , setshowPassword] = useState(false);
  const[showconfirmPassword , setshowconfirmPassword] = useState(false);
  const [data,setData]= useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: ""
  })
  console.log(data);
  const handleshowPassword = () =>{
    setshowPassword(preve=>!preve)
  }
  const handleshowconfirmPassword = () =>{
    setshowconfirmPassword(preve=>!preve)
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

  const handleUploadProfileImage = async(e)=>{
    //console.log(e.target.files[0])
    const data = await ImagetoBase64(e.target.files[0])
    //console.log(data)

    setData((preve)=>{
      return{
          ...preve,
          image : data
      }
    })
  }

  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {firstName,email,password,confirmpassword} = data
    if(firstName&&email&&password&&confirmpassword){
      if(password===confirmpassword){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
          method : "POST",
          headers : {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

        const dataRes = await fetchData.json()
        console.log(dataRes); 

        toast(dataRes.message)
        //alert(dataRes.message)
        if(dataRes.alert){
          navigate("/login")
        }
        
      } else{
        alert("password and confirmpassword do not match")
      }
    } else{
      alert("Please fill the mandatory fields")
    }
  }
  return (
    <div className='p-3 md:p-3'>
    <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
      {/*<h1 className='text-center text-2xl font-bold'>Signup</h1>*/}
      <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
        <img src={data.image?data.image:loginsignupImage} className='w-full h-full'/>
        <label htmlFor='profileImage'>
        <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>    
          <p className='text-sm p-1 text-white'>Upload</p>
        </div>
        <input type={'file'} id='profileImage' accept='image/*'  className='hidden' onChange={handleUploadProfileImage}/>
        </label>
      </div>

      <form className='w-full py-0 flex flex-col' onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First name</label>
      <input type={'text'} id='firstName' name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.firstName} onChange={handleOnChange}/>
      
      <label htmlFor='lastName'>Last name</label>
      <input type={'text'} id='lastName' name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange}/>

      <label htmlFor='email'>Email</label>
      <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}/>

      <label htmlFor='password'>Password</label>
      <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-1 focus-within:outline  focus-within:outline-blue-300'>
      <input type={showPassword?"text":'password'} id='password' name='password' className='bg-slate-200 w-full border-none outline-none' value={data.password} onChange={handleOnChange}/>
      <span className='flex text-xl cursor-pointer' onClick={handleshowPassword}>{showPassword?<BiShow/> : <BiHide/>}</span>
      </div>

      <label htmlFor='confirmpassword'>confirm Password</label>
      <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-1 focus-within:outline  focus-within:outline-blue-300'>
      <input type={showconfirmPassword?"text":'password'} id='confirmpassword' name='confirmpassword' className='bg-slate-200 w-full border-none outline-none' value={data.confirmpassword} onChange={handleOnChange}/>
      <span className='flex text-xl cursor-pointer' onClick={handleshowconfirmPassword}>{showconfirmPassword?<BiShow/> : <BiHide/>}</span>
      </div>

      <button className='max-w-[140px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-1'>SignUp</button>
      </form>

      <p>Already have an account? <Link to={"/login"} className='text-red-600 underline'>Login Here</Link></p>
    </div>
    </div>
  )
}

export default Signup