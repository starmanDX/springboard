import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileViewer = ({ name = "Elie", color = "black"}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadProfile() {
      const res = await axios.get(`https://api.github.com/users/${name}`);
      setData(res.data.name);
    }
    loadProfile();
  }, [name]);
  return <h3 style={{color}}>{data ? data : "Loading..."}</h3>;
};

export default ProfileViewer;
