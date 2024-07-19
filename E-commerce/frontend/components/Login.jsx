import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/authApi";
import Navigation from "../components/Navigation";
import { useSessionAddToCartMutation } from "../api/cartApi";
import toast, {Toaster} from 'react-hot-toast';

export default function Login() {
  const [cart] = useSessionAddToCartMutation();
  const navigate = useNavigate();
  const [data] = useLoginUserMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await data(form);
    console.log(result);
    if(result.error) return toast.error("Wrong Login!", {
      position: "top-right",
    });

    if (!result.error && window.sessionStorage.cart) {
      let session = JSON.parse(window.sessionStorage.cart).map((cart) => {
        return {
          productid: Number(cart.productid),
          userid: result.data.user.id,
        };
      });
      cart({ cart: session, token: result.data.token });
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.removeItem("counter");
     
    }
    navigate("/");
  };

  return (
    <>
      <Navigation></Navigation>
      <div className="loginpage">
        <h2 className="login">Login</h2>
        <hr/>
        <form onSubmit={onSubmit}>
        <div className="inputf"> 
          <label>
            Email: 
          </label>
          <input type="email" name="email" onChange={onChange}></input>
          </div>
          <div className="inputf"> 
          <label>
            Password:{" "}
          </label>
          <input type="password" name="password" onChange={onChange}></input>
          </div>
          <br/>
          <button>Submit</button>
        </form>
        
      </div>
      <Toaster />
    </>
  );
}
