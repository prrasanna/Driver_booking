import React, { useState, useContext } from "react";
import { createBooking } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";

export default function BookingForm({ refresh }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [datetime, setDatetime] = useState("");
  const { token } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    await createBooking(token, { pickupLocation: pickup, dropLocation: drop, datetime });
    refresh();
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3">
        <Form.Label>Pickup Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Drop Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter drop location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" variant="success" className="w-100 rounded-pill">
        Book Driver
      </Button>
    </Form>
  );
}
