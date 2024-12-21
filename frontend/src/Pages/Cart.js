import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../Component/cartProduct";
import emptyCartImage from "../assest/empty.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  //const stripePromise = await loadStripe
  const handlePayment = async () => {
    if (user.email) {
      // Load Stripe with the public key
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      
      // Make API call to backend for checkout session creation
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productCartItem)  // Send cart items to backend
      });
  
      // Check for server errors
      if (res.status === 500) {
        console.error("Server error: Something went wrong with the payment session");
        return;
      }
  
      // Extract the sessionId from backend response
      const { sessionId } = await res.json();
  
      // Ensure that sessionId exists
      if (!sessionId) {
        console.error("Session ID not returned from the server");
        return;
      }
  
      // Display toast to notify the user
      toast("Redirecting to payment Gateway");
  
      // Redirect to Stripe checkout using the sessionId
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      // Handle errors in redirection (e.g., invalid session ID or other issues)
      if (error) {
        console.error("Stripe checkout error:", error.message);
        toast("Payment failed. Please try again.");
      }
    } else {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  
  
 
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white rounded-full" onClick={handlePayment}>
              Payment
        </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;