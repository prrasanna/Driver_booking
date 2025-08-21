import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              <LoginForm />

              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-decoration-none fw-bold">
                    Register
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
