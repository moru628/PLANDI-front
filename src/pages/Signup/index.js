import React from "react";
import './index.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../nav/Navbar";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/modules/userStore";

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault()
      const newUser = {
        name,
        email,
        password,
        profileImg: "", 
        description: "", 
        topic: "", 
        post:[]
      };
    
      console.log("New User Data:", newUser); 
      dispatch(createUser(newUser))
      .then(() => {
          navigate('/login');
      })
    }
    return (
      <div className="signup-container">
        <div className='title-signup'>
            <div className='line-signup'>--</div>
            <div className='login'>SIGN UP</div>
            <div className='line-signup'>--</div>
        </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group-signup">
          <label className="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="type your name"
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
        </div>

        <div className="form-group-signup">
          <label className="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="type your email"
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </div>

        <div className="form-group-signup">
          <label className="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
        </div>
        
        <div className="policy">
          I understood the <a href="https://www.example.com">terms & policy</a>.
        </div>
        <div className="btn-container">
          <button type="submit" className="signup-button">SIGN UP</button>
        </div>
      </form>
      <div className="signup-bottom">
        <div className="sign-way-1">
            or sign up with
          </div>

          <img src="/assets/google.png"alt="" className="google-icon"/>

          <div className="sign-way-2">
            Have an account? 
            <Link to="/login"><span>LOG IN</span></Link>
          </div>
      </div>
        <Navbar />
  </div>
    )
}

export default Signup