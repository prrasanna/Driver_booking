import React, { useContext, useState } from "react";
import { login as apiLogin } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiLogin({ email, password });
      login(res.data.token, res.data.role);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100 rounded-pill">
        Login
      </Button>
    </Form>
  );
}
