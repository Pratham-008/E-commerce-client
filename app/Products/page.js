"use client";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import NewProducts from "../component/NewProducts";



export default  function Home() {
  const [newproducts, setnewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchdata = async () => {
        try {
          const { data } = await axios.get("/api/products");
          console.log(data);
          setnewProducts(data.newproducts);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
          console.log(newproducts);
        }
      };
  
      fetchdata();
    }, []);
  return (
    <div>
      <Header/>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <NewProducts newproducts={newproducts} title="All Products" />
      )}
      
    </div>
  );
}
