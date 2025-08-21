import React, { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function DashboardLayout({ children, role }) {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold">
            🚖 Acting Driver App
          </Navbar.Brand>
          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-light small fw-semibold">
              {role?.toUpperCase()} Dashboard
            </span>
            <Button
              variant="outline-light"
              size="sm"
              className="rounded-pill px-3"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>
      <Container fluid>{children}</Container>
    </>
  );
}
