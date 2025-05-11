<<<<<<< HEAD
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
=======
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Outlet, Navigate } from "react-router-dom";
>>>>>>> master

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

<<<<<<< HEAD
  if (loading) return <div>Loading...</div>
=======
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
        </div>
      </div>
    );
  }
>>>>>>> master

  return user ? <Outlet /> : <Navigate to="/error" />;
};

<<<<<<< HEAD
export default PrivateRoute;
=======
export default PrivateRoute;
>>>>>>> master
