import React from 'react';
import axios from 'axios';

function RazorpayGateway() {
  const price = localStorage.getItem("price") || "0";

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await axios.post('https://studenthive.onrender.com/bookings/create-order', {
      amount: price,
    });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: 'rzp_live_Cj4Nty3eyy07Vi', // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'Studenthive',
      description: 'Test Transaction',
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post('https://studenthive.onrender.com/bookings/success', data);

        alert(result.data.msg);
      },
      prefill: {
        name: 'Studenthive',
        email: 'psogale212@gmail.com',
        contact: '9970247220',
      },
      notes: {
        address: 'Studenthive Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Complete Your Payment</h2>
        <p style={styles.description}>
          You are about to pay <span style={styles.amount}>₹{price}</span> for your booking.
        </p>
        <button style={styles.button} onClick={displayRazorpay}>
          Pay ₹{price} Now
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px 30px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#555555',
    marginBottom: '20px',
  },
  amount: {
    fontWeight: 'bold',
    color: '#61dafb',
  },
  button: {
    backgroundColor: '#61dafb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#4ec0e0',
  },
};

export default RazorpayGateway;
