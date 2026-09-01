import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {

      try {

        const result = await axios.get(
          "https://ec2-3-107-104-5.ap-southeast-2.compute.amazonaws.com:3002/currentUser",
          {
            withCredentials: true,
          }
        );

        if (result.data.success) {

          setLoading(false);

        } else {

        window.location.href = "/login";

        }

      } catch (err) {

        window.location.href = "/login";

      }

    };

    checkUser();

  }, []);

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (
    <GeneralContextProvider>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;