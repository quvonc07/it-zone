import { createContext, useState } from "react";

export const AuthContext = createContext();

const tokin = localStorage.getItem("userTokin")

const AuthContextProvider = ({ children }) => {
    const [user,setUser] = useState({isLoged:tokin?true:false,token:""})
 
    return <>
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    </>
}
export default AuthContextProvider