import Header from "./component/Header";
import Feature from "./component/Feature";
import { Products } from "../model/product";
import { mongooseconnect } from "../lib/mongoose";
import NewProducts from "./component/NewProducts";

export default async function Page() {
  await mongooseconnect();
  const featuredProductId = "68050a09bce75e857d638f6f";
  const product = await Products.findById(featuredProductId).lean();
  const newproducts = await Products.find({}).sort({ updatedAt: -1 }).lean();
  console.log(newproducts)
  return (
    <div>
      <Header/>
      <Feature product={JSON.parse(JSON.stringify(product))} />
      <NewProducts newproducts={JSON.parse(JSON.stringify(newproducts))} title="New Arrivals" />
    </div>
  );
}
