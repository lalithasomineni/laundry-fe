import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function Payment(props) {
  const [product, setProduct] = useState({
    name: "Clothes for Wash",
    price: props.location.price,
    productBy: "Laundry",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        // console.log("RESPONSE ", response);
        const { status } = response;
        // console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout
          stripeKey="pk_test_51HOHP2I48GM8q4nTrCjcQGs1hth6YZKupjn3VfXUw9SkaFXtQ1N29gWL7fR7sYR2CIHffA2Pa4ekpy7rWYGZnbiU00J0mvK7wM"
          token={makePayment}
          name={`Total Cost is ${props.location.price}`}
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn btn-lg btn-primary btn-block">
            Get your layndry done in just {props.location.price} Rs.
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default Payment;
