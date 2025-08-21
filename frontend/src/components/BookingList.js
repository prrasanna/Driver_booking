import React, { useContext, useEffect, useState } from "react";
import { getBookings } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { ListGroup, Badge, Card, Tabs, Tab } from "react-bootstrap";

export default function BookingList() {
  const { token, role } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const fetch = async () => {
    const res = await getBookings(token);
    setList(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  // Filter bookings by tab
  const filterBookings = () => {
    if (activeTab === "pending") {
      return list.filter((b) => b.status === "pending");
    } else if (activeTab === "completed") {
      return list.filter((b) => b.status === "completed");
    }
    return list;
  };

  const filteredList = filterBookings();

  return (
    <Card className="shadow-sm border-0 rounded-3">
      <Card.Body>
        <h5 className="mb-3">Bookings</h5>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title="All Bookings" />
          <Tab eventKey="pending" title="Pending" />
          <Tab eventKey="completed" title="Completed" />
        </Tabs>

        {filteredList.length === 0 ? (
          <p className="text-muted">No bookings found.</p>
        ) : (
          <ListGroup variant="flush">
            {filteredList.map((b) => (
              <ListGroup.Item
                key={b._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{b.pickupLocation}</strong> → {b.dropLocation} <br />
                  <small className="text-muted">
                    {new Date(b.datetime).toLocaleString()}
                  </small>
                  <br />
                  {role === "customer" && b.driver && (
                    <span className="text-success">
                      Driver: {b.driver.name}
                    </span>
                  )}
                  {role === "driver" && b.user && (
                    <span className="text-primary">
                      Customer: {b.user.name}
                    </span>
                  )}
                </div>
                <Badge
                  bg={
                    b.status === "pending"
                      ? "warning"
                      : b.status === "assigned"
                      ? "info"
                      : "success"
                  }
                  text={b.status === "pending" ? "dark" : "light"}
                  className="px-3 py-2 rounded-pill"
                >
                  {b.status}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
