import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RedirectPage = () => {
  const location = useLocation();
  const { url } = location.state || {};

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h3>Redirecting to PayFast...</h3>
      <div className="spinner">⏳</div>
    </div>
  );
};

export default RedirectPage;
