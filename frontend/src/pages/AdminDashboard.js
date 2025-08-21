import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Card, Table, Form, Button } from "react-bootstrap";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bookingRes = await axios.get("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const driverRes = await axios.get("http://localhost:5000/api/drivers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(bookingRes.data);
    setDrivers(driverRes.data);
  };

  const handleDriverSelect = (bookingId, driverId) => {
    setSelectedDrivers((prev) => ({ ...prev, [bookingId]: driverId }));
  };

  const assignDriver = async (bookingId) => {
    const driverId = selectedDrivers[bookingId];
    if (!driverId) return alert("Please select a driver");
    await axios.put(
      `http://localhost:5000/api/bookings/${bookingId}/assign`,
      { driverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  return (
    <DashboardLayout role="admin">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>
          <h5 className="mb-4">Assign Drivers to Bookings</h5>
          <Table striped bordered hover responsive className="align-middle text-center shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Assign Driver</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.pickupLocation}</td>
                  <td>{booking.dropLocation}</td>
                  <td>{new Date(booking.datetime).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "pending"
                          ? "bg-warning text-dark"
                          : booking.status === "assigned"
                          ? "bg-info text-dark"
                          : "bg-success"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === "pending" ? (
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Form.Select
                          size="sm"
                          className="w-50"
                          value={selectedDrivers[booking._id] || ""}
                          onChange={(e) =>
                            handleDriverSelect(booking._id, e.target.value)
                          }
                        >
                          <option value="">Select Driver</option>
                          {drivers.map((driver) => (
                            <option key={driver._id} value={driver._id}>
                              {driver.name} ({driver.phone})
                            </option>
                          ))}
                        </Form.Select>
                        <Button
                          size="sm"
                          variant="primary"
                          className="rounded"
                          disabled={!selectedDrivers[booking._id]}
                          onClick={() => assignDriver(booking._id)}
                        >
                          Assign
                        </Button>
                      </div>
                    ) : (
                      <span>{booking.driver?.name || "—"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
