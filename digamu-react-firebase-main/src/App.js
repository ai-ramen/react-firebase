import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Dashboard from './components/Dashboard';
import Dishes from './components/Dishes';
import Employees from './components/Employees';
import Analytics from './components/Analytics';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dishes"
                element={
                  <ProtectedRoute>
                    <Dishes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
        </Routes>
      </ UserAuthContextProvider>
    </div>
  );
}

export default App;
