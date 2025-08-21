import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (role === "admin") navigate("/admin");
  }, [role, navigate]);

  return (
    <DashboardLayout role={role}>
      <Card className="shadow-lg border-0 rounded-4 mb-4">
        <Card.Body>
          {role === "customer" && (
            <>
              <h5 className="mb-3">Book a Driver</h5>
              <BookingForm refresh={() => window.location.reload()} />
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>
          <h5 className="mb-3">Your Bookings</h5>
          <BookingList />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
