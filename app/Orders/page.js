"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Title from "../component/Title";
import Table from "../component/Table";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 20px;
`;
export default function Page() {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    async function getdata() {
      const { data } = await axios.get("/api/Orders");
      setorders(data);
      console.log(data);
    }
    getdata();
  }, []);
  console.log("orders:", orders);

  return (
    <>
      <Header />
      <StyledDiv>
        <Title>All Orders</Title>
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
            {orders.length > 0 &&
              orders.map((order, index) => (
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
                  <td>{order.createdAt.replace("T", " ").substring(0, 19)}</td>
                  <td>
                    {order.lineitems.map((e, index) => (
                      <div key={index}>
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
      </StyledDiv>
    </>
  );
}
