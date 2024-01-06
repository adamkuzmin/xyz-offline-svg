import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LoginPage from "./auth";
import styled from "styled-components";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // To handle loading state

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      try {
        await axios.get("/api/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        // Handle error, token is invalid or expired
        Cookies.remove("token"); // Remove invalid token
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    validateToken();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
