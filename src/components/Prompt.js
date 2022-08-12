import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Prompt = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    let storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== null) {
      setUser(storedUser);
      return;
    }
    const value = prompt("Welcome, Enter your Username");
    sessionStorage.setItem("user", value);
    setUser(value);
  }, []);

  return (
    <div>
      <h1>Welcome {user}</h1>
    </div>
  );
};

export default Prompt;
