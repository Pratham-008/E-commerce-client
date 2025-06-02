"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Title from "../component/Title";
import Table from "../component/Table";
import styled from "styled-components";
import Center from "../component/Center";

const StyledDiv = styled.div`
  padding: 20px;
`;

const MobileOrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background: #fff;
  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopTableWrapper = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

export default function Page() {
  const [orders, setorders] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObject = {};
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieObject[name] = value;
    });
    return cookieObject;
  }

  useEffect(() => {
    const { userid } = getAllCookies();
    if (!userid) {
      window.location.href = "/Login";
    }
    async function getdata() {
      const { data } = await axios.get("/api/Orders/" + userid);
      setorders(data);
    }
    getdata();

    // Detect mobile
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      {orders.length === 0 ? (
        <Center>
          <h2>You have {orders.length} orders to display...</h2>
        </Center>
      ) : (
        <StyledDiv>
          <Title>All Orders</Title>
          {/* Desktop Table */}
          <DesktopTableWrapper>
            <Table $basic>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Receipt</th>
                  <th>Order Status</th>
                  <th>Paid</th>
                  <th>Date</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>
                      {order.name}
                      <br />
                      <b>Address:</b> {order.streetaddress},{order.city},
                      {order.country},{order.pincode}
                      <br />
                      <b>Mobile-number:</b> {order.phonenumber}
                    </td>
                    <td>{order.order_status}</td>
                    <td>{order.paid ? "Yes" : "No"}</td>
                    <td>
                      {order.createdAt.replace("T", " ").substring(0, 19)}
                    </td>
                    <td>
                      {order.lineitems.map((e, idx) => (
                        <div key={idx}>
                          {JSON.stringify(e.quantity)} x{" "}
                          {e.price_data.product_data.name}
                          <br />
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DesktopTableWrapper>
          {/* Mobile Cards */}
          {orders.map((order, index) => (
            <MobileOrderCard key={index}>
              <b>Order #{index + 1}</b>
              <div>
                <b>Order Id:</b> {order._id}
              </div>
              <div>
                <b>Name:</b> {order.name}
              </div>
              <div>
                <b>Address:</b> {order.streetaddress}, {order.city}, {order.country}, {order.pincode}
              </div>
              <div>
                <b>Mobile-number:</b> {order.phonenumber}
              </div>
              <div>
                <b>Status:</b> {order.order_status}
              </div>
              <div>
                <b>Paid:</b> {order.paid ? "Yes" : "No"}
              </div>
              <div>
                <b>Date:</b> {order.createdAt.replace("T", " ").substring(0, 19)}
              </div>
              <div>
                <b>Products:</b>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {order.lineitems.map((e, idx) => (
                    <li key={idx}>
                      {JSON.stringify(e.quantity)} x {e.price_data.product_data.name}
                    </li>
                  ))}
                </ul>
              </div>
            </MobileOrderCard>
          ))}
        </StyledDiv>
      )}
    </>
  );
}
