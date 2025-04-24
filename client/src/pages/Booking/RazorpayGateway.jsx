import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RazorpayGateway() {
  const price = localStorage.getItem("price") || "0";
  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    try {
      const result = await axios.post('https://studenthive.onrender.com/bookings/create-order', {
        amount: price,
      });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: 'rzp_live_Cj4Nty3eyy07Vi', // Change to your test key if testing
        amount: amount.toString(),
        currency,
        name: 'Studenthive',
        description: 'Test Transaction',
        image: 'https://example.com/logo.png',
        order_id,
        handler: async function (response) {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await axios.post('https://studenthive.onrender.com/bookings/verify-payment', data);
            if (verifyRes.data.success) {
              navigate('/Success');
            } else {
              alert('Payment verification failed.');
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            alert('Error verifying payment');
          }
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Something went wrong while creating the order.");
    }
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
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px 30px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  amount: {
    fontWeight: 'bold',
    color: '#61dafb',
  },
  button: {
    backgroundColor: '#61dafb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default RazorpayGateway;
