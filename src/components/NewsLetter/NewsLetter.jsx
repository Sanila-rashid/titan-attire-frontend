import React, { useState } from 'react';
import './NewsLetter.css';
import api from '../../utils/api';


const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('❌ Please enter your email.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('❌ Enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await api.post("/newsletter", { email }); // ✅ matches backend route

      // ✅ Use backend message dynamically
      setMessage(res.data.message || 'You have successfully subscribed!');
      
      // Clear input
      setEmail('');
    } catch (err) {
      console.error(err);
      
      // Handle backend validation errors (like already subscribed)
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('❌ Subscription failed. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe To Our Newsletter and Stay Updated</p>
      <div className='newsletter-input'>
        <input
          type='email'
          placeholder='Your Email ID'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe} disabled={loading}>
          {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </button>
      </div>
      {message && <p className='newsletter-message'>{message}</p>}
    </div>
  );
};

export default NewsLetter;
