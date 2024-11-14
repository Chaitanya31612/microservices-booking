// contexts/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data only once on initial load
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          "/api/users/currentuser"
          // { withCredentials: true } // Add this if you need cookies for auth
        );
        setCurrentUser(data?.currentUser || null);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const userSignedOut = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, loading, userSignedOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
