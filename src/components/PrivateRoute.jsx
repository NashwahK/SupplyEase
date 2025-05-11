import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data?.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>

  return user ? <Outlet /> : <Navigate to="/error" />;
};

export default PrivateRoute;
