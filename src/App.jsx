import { Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import axios from "axios";
const queryClient = new QueryClient();
function App() {
  const options = {
    method: "GET",
    url: "https://pizza-and-desserts.p.rapidapi.com/pizzas",
    headers: {
      "X-RapidAPI-Key": "c8cd5ccb22mshadae1f15c2a1814p197a4fjsne85622990140",
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);
}

export default App;
