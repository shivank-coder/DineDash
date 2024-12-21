import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';
function App() {

   const dispatch = useDispatch()
   const productData = useSelector((state)=>state.product)
   
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])

  return (
    <>
    <Toaster />
    <div className=''>
      <Header/>
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
      
    </div>
    </>
    
  );
}

export default App;
