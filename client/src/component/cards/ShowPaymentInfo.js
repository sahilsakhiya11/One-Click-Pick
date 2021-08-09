import React from "react";

const ShowPaymentInfo = ({ order }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      <br/>
      <span>
        Amount:{" "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span> <br/>
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      <br/>
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      <br/>
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      <br/>
      <span>
        Orderd on:{" "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      <br/>
      <span className="badge bg-primary text-white">
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
