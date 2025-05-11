<<<<<<< HEAD
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthProvider";

const GreetingCard = () => {
  const [temperature, setTemperature] = useState(null);
  const [userInfo, setUserInfo] = useState({firstName:"", lastName:""});
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const formattedDay = today.toLocaleString("en-US", { weekday: "long" });
  const wish = today.getHours() < 11 ? "Good Morning" : "Good Evening";
=======
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional but recommended for styling

const GreetingCard = () => {
  const [temperature, setTemperature] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "" });

  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDay = today.toLocaleString("en-US", { weekday: "long" });
  const wish = today.getHours() < 11 ? "Good Morning" : "Good Evening";

>>>>>>> master
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user?.email) return;
      const { data, error } = await supabase
<<<<<<< HEAD
      .from("Users") 
      .select("*")
      .eq("user_email", user.email) 
      .single();
      if (error) {
        console.error("Error fetching user info:", error);
      } else {
        console.log(data)
        setUserInfo({firstName:data.user_firstname, lastName:data.user_lastname});
=======
        .from("supply_chain_manager")
        .select("*")
        .eq("email_address", user.email)
        .single();

      if (error) {
        console.error("Error fetching user info:", error);
      } else {
        const firstName = data.name?.split(" ")[0] || "";
        setUserInfo({ name: firstName });
>>>>>>> master
      }
    };

    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }
<<<<<<< HEAD
    console.log(user)
=======
>>>>>>> master

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          const response = await fetch(url);
          const data = await response.json();
<<<<<<< HEAD
          setTemperature(Math.round(data.main.temp)); // Rounded correctly - pLEASE for the love of God be correct
=======
          setTemperature(Math.round(data.main.temp));
>>>>>>> master
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      },
<<<<<<< HEAD
      (error) => console.error("Error getting location:", error.message) 
=======
      (error) => console.error("Error getting location:", error.message)
>>>>>>> master
    );
  }, []);

  return (
    <div className="m-6 p-4 rounded-lg text-white bg-gradient-to-r from-[#A584EC] to-[#5E4B86]/40">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold py-2">{wish}, {userInfo.firstName}!</h2>
      <p className="text-sm font-thin">
        {formattedDate} • {formattedDay} • {temperature !== null ? `${temperature}°C` : "Loading..."}
=======
      <h2 className="text-2xl font-bold py-2">
        {userInfo.name ? `${wish}, ${userInfo.name}!` : <Skeleton width={150} />}
      </h2>
      <p className="text-sm font-thin">
        {formattedDate} • {formattedDay} •{" "}
        {temperature !== null ? `${temperature}°C` : <Skeleton width={50} />}
>>>>>>> master
      </p>
    </div>
  );
};

export default GreetingCard;
