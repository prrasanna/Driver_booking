import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate=useNavigate();
  const { role, logout } = useContext(AuthContext);
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }
  }, [role]);
  return (
    <div className="dashboard">
      <h2>Dashboard - {role.toUpperCase()}</h2>

      {role === "customer" && (
        <>
          <BookingForm refresh={() => window.location.reload()} />
        </>
      )}

      <BookingList />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
