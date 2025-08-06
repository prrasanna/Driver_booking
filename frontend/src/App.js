import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';

function AppRoutes() {
  const { token } = useContext(AuthContext);  // this line works only inside AuthProvider

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
