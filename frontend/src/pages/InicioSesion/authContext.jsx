import { createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [rol, setRol] = useState(null);

    useEffect(()=>{
    const token = localStorage.getItem('token');
    const userRol = localStorage.getItem('rol');
    setIsLoggedIn(!!token);
    setRol(userRol);
  }, []);

   const login = (token, userRol) => {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    setIsLoggedIn(true);
    setRol(userRol);
   };

   const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setIsLoggedIn(false);
    setRol(null);
   };

   return(
    <AuthContext.Provider value={ {isLoggedIn, rol, login, logout}}>
      {children}
    </AuthContext.Provider>
   );
};


