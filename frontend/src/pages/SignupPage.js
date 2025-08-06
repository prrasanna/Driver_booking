import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    licenseNumber: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.role === 'driver') {
        // Hit driver-specific signup route
        await axios.post('http://localhost:5000/api/drivers/signup', {
          name: form.name,
          email: form.email,
          password: form.password,
          licenseNumber: form.licenseNumber,
          phone: form.phone
        });
      } else {
        // Use generic user signup
        await axios.post('http://localhost:5000/api/auth/signup', {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        });
      }

      alert('Signup successful! Please login.');
    } catch (err) {
      console.error(err);
      alert('Signup failed: ' + err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <select name="role" onChange={handleChange} required>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === 'driver' && (
          <>
            <input name="licenseNumber" placeholder="License Number" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
