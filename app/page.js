"use client";
import Header from "./component/Header";
import Feature from "./component/Feature";
import { useEffect, useState } from "react";
import NewProducts from "./component/NewProducts";
import axios from "axios";

export default function Page() {
  const [newproducts, setnewProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("/api/products");
        console.log(data);
        setnewProducts(data.newproducts);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        console.log(product);
        console.log(newproducts);
      }
    };

    fetchdata();
  }, []);
  return (
    <div>
      <Header />
      {loading == false ? (
        <>
          <Feature product={product} />
          <NewProducts newproducts={newproducts} title="New Arrivals" />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
