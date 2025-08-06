import React, { useContext, useState } from 'react';
import { login as apiLogin } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate=useNavigate();

  const submit = async e => {
  e.preventDefault();
  try {
    const res = await apiLogin({ email, password });
    console.log("Login success", res.data); 
    login(res.data.token, res.data.role); 
    navigate('/dashboard')  
  } catch (err) {
    console.error("Login failed", err);     // <-- debug
    alert("Login failed");
  }
}
  return (
    <form onSubmit={submit}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
