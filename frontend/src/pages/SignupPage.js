import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    licenseNumber: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.role === "driver") {
        await axios.post("http://localhost:5000/api/drivers/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
          licenseNumber: form.licenseNumber,
          phone: form.phone,
        });
      } else {
        await axios.post("http://localhost:5000/api/auth/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
      alert("Signup successful! Please login.");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" onChange={handleChange} value={form.role}>
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                {form.role === "driver" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>License Number</Form.Label>
                      <Form.Control
                        name="licenseNumber"
                        placeholder="Enter license number"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </>
                )}

                <Button type="submit" variant="success" className="w-100 rounded-pill">
                  Register
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Login
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
