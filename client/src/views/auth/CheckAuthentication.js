import React, { useState, useEffect } from "react";

const CheckAuthentication = async ({ initial }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      //console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return IsAuthenticated;
};

export default CheckAuthentication;
