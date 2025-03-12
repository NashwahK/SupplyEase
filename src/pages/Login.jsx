import React from "react";
import LoginBg from '../../public/assets/loginpagebg.jpg'
import Header from "../components/Header";
import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center"
    style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <Header />
      <LoginCard />
    </div>
  );
};

export default Login;
