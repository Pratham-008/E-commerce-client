// pages/index.js

import Header from "../component/Header";
import { Products } from "@/model/product";
import { mongooseconnect } from "@/lib/mongoose";
import NewProducts from "../component/NewProducts";



export default async function Home() {
  await mongooseconnect();
  const newproducts = await Products.find({}).sort({ updatedAt: -1 }).lean();
  console.log(newproducts)
  return (
    <div>
      <Header/>
      <NewProducts newproducts={JSON.parse(JSON.stringify(newproducts))} title="All Products" />
    </div>
  );
}
