"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { CartContext } from "../component/CartContext";
import styled from "styled-components";
import Center from "../component/Center";
import Primarybtn from "../component/Primarybtn";
import axios from "axios";
import Table from "../component/Table";
import Input from "../component/Input";
import Header from "../component/Header";
import Script from "next/script";
import { useRouter } from "next/navigation";

const CartWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const Box = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 10px;
  border-radius: 10px;
`;
const Productimg = styled.div`
  padding: 10px;
  font-size: 0.9rem;
  color: #333;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #eee;
    max-width: 150px;
    max-height: 150px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0px 5px;
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0px;
  padding-left: 10px;
`;
const StyledRow = styled.tr`
  td {
    border-bottom: 1px solid #eee;
  }
`;
const TotalRow = styled.tr`
  td {
    font-weight: normal;
    font-size: 1.2rem;
    color: #333;
  }
`;
const Styledh2 = styled.h2`
  padding-left: 10px;
`;

const MobileProductCard = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 12px;
    background: #fff;
  }
`;

const MobileProductImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const DesktopTableWrapper = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Page = () => {
  const router = useRouter();
  let total = 0;
  const { cartproducts, addproduct, removeproduct, ls, setcartProducts } =
    useContext(CartContext);
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [streetaddress, setstreetaddress] = useState("");
  const [country, setcountry] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [Userid, setUserid] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const cookie = getAllCookies();
    const { userid, name, id, password, mobilenumber } = cookie;
    console.log(cookie)

    Object.keys(cookie).length > 1
      ? (setUserid(userid), setname(name), setphonenumber(mobilenumber))
      : (alert("Login before Order"), router.push("/Login"));
  }, []);
  useEffect(() => {
    if (cartproducts.length > 0) {
      axios
        .post("/api/cart", { cartproducts })
        .then((res) => {
          setproducts(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setproducts([]);
    }
  }, [cartproducts]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  for (const productId of cartproducts) {
    const product = products.find((product) => product._id === productId);
    if (product) {
      total += product.price;
    }
  }
  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObject = {};

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieObject[name] = value;
    });

    return cookieObject;
  }

  const lesstheproduct = async (id) => {
    console.log(id);
    removeproduct(id);
  };
  const moretheproduct = (id) => {
    addproduct(id);
    console.log(cartproducts);
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }
    const formData = {
      name,
      city,
      pincode,
      streetaddress,
      country,
      phonenumber,
      products: cartproducts.join(","),
      amount: total * 100,
      Userid,
    };
    console.log(Userid);
    try {
      const res = await axios.post("/api/checkout", formData);
      const data1 = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data1.amount,
        currency: "INR",
        name: "E-Commerce Store",
        image:
          "https://thafd.bing.com/th/id/OIP.pXWxNh2AMIwigXylCoebKAHaHa?rs=1&pid=ImgDetMain",
        description: "Order Payment",
        order_id: data1.id,
        handler: async function (response) {
          const res = await axios.post("/api/varifyorder", {
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            order2_id: data1.id,
          });
          const data = res.data;
          console.log(data);
          if (data.isOk) {
            ls.removeItem("cart");
            setcartProducts([]);
            alert("payment successfully done!");
          } else {
            alert("Payment failed");
          }
        },
        theme: {
          color: "#32bc7e",
        },
      };
      console.log(data1);

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      <Center>
        <CartWrapper>
          <Box>
            {!products.length ? (
              <Box>There Is No Product In Cart</Box>
            ) : (
              products.length > 0 && (
                <>
                  <CartTitle>Cart</CartTitle>
                  {/* Desktop Table */}
                  <DesktopTableWrapper>
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <StyledRow key={product._id}>
                            <td>
                              <Productimg>
                                <img src={product.images[0]} />
                                {product.name}
                              </Productimg>
                            </td>
                            <td>
                              ₹
                              {product.price *
                                cartproducts.filter((id) => id == product._id)
                                  .length}
                            </td>
                            <td>
                              <Primarybtn
                                onClick={() => lesstheproduct(product._id)}
                              >
                                -
                              </Primarybtn>
                              <QuantityLabel>
                                {
                                  cartproducts.filter((id) => id == product._id)
                                    .length
                                }
                              </QuantityLabel>
                              <Primarybtn
                                onClick={() => moretheproduct(product._id)}
                              >
                                +
                              </Primarybtn>
                            </td>
                          </StyledRow>
                        ))}
                        <TotalRow>
                          <td>Total</td>
                          <td></td>
                          <td>₹{total}</td>
                        </TotalRow>
                      </tbody>
                    </Table>
                  </DesktopTableWrapper>
                  {/* Mobile Product Cards */}
                  {isMobile &&
                    products.map((product) => (
                      <MobileProductCard key={product._id}>
                        <MobileProductImg src={product.images[0]} alt={product.name} />
                        <div>
                          <div>
                            <b>{product.name}</b>
                          </div>
                          <div>
                            Price: ₹
                            {product.price *
                              cartproducts.filter((id) => id == product._id)
                                .length}
                          </div>
                          <div>
                            Quantity:
                            <Primarybtn
                              onClick={() => lesstheproduct(product._id)}
                              style={{ margin: "0 4px" }}
                            >
                              -
                            </Primarybtn>
                            <QuantityLabel>
                              {
                                cartproducts.filter((id) => id == product._id)
                                  .length
                              }
                            </QuantityLabel>
                            <Primarybtn
                              onClick={() => moretheproduct(product._id)}
                              style={{ margin: "0 4px" }}
                            >
                              +
                            </Primarybtn>
                          </div>
                        </div>
                      </MobileProductCard>
                    ))}
                  {/* Mobile Total */}
                  {isMobile && products.length > 0 && (
                    <div style={{ fontWeight: "bold", margin: "12px 0" }}>
                      Total: ₹{total}
                    </div>
                  )}
                </>
              )
            )}
          </Box>
          {!!cartproducts.length && (
            <Box style={isMobile ? { marginTop: 16 } : {}}>
              <Styledh2>Order Information</Styledh2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePayment();
                }}
                method="POST"
              >
                <Box>
                  <Input
                    type="text"
                    required
                    name="name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    placeholder="Name"
                  />

                  <Input
                    type="text"
                    required
                    name="city"
                    onChange={(e) => setcity(e.target.value)}
                    value={city}
                    $flex
                    placeholder="City"
                  />
                  <Input
                    type="text"
                    required
                    name="pincode"
                    onChange={(e) => setpincode(e.target.value)}
                    value={pincode}
                    $flex
                    placeholder="Pin Code"
                  />

                  <Input
                    type="text"
                    required
                    name="streetaddress"
                    onChange={(e) => setstreetaddress(e.target.value)}
                    value={streetaddress}
                    placeholder="Street Address"
                  />
                  <Input
                    type="text "
                    name="country"
                    onChange={(e) => setcountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                  />
                  <Input
                    type="text"
                    required
                    name="phonenumber"
                    onChange={(e) => setphonenumber(e.target.value)}
                    value={phonenumber}
                    placeholder="Phone Number"
                  />
                  <Input
                    type="hidden"
                    name="products"
                    value={cartproducts.join(",")}
                  />
                  <Input type="hidden" name="amount" value={total} />

                  <Primarybtn $block type="submit">
                    Continue Payment
                  </Primarybtn>
                </Box>
              </form>
            </Box>
          )}
        </CartWrapper>
      </Center>
    </>
  );
};

export default Page;
