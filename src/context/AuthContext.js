import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  setUserFunction: (userData) => {},
  isLoading: true,
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setIsLoading(false); 
  }, []);

  const setUserFunction = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData)); // Čuvamo user u localStorage
      setUser(userData);
    } else {
      localStorage.removeItem("user"); // Brisanje iz localStorage kada se korisnik izloguje
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUserFunction, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
