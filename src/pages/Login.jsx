import React, { useState, useEffect } from "react";
import LoginBg from '../../public/assets/loginpagebg.jpg';
import Header from "../components/Header";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignupCard";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [isTransitioning, setIsTransitioning] = useState(false); 

  const toggleView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
    }, 500); // CHANGE TIME HERE
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, [isTransitioning]);

  return (
    <div className="min-h-screen flex flex-row items-center justify-center"
      style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />

      {/* Card Transition */}
      <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {isLogin ? <LoginCard toggleView={toggleView} /> : <SignUpCard toggleView={toggleView} />}
      </div>
    </div>
  );
};

export default Login;
