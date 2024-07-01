import { createContext, useState } from "react";
export const UserContext = createContext();
const userDataInfo = {
    name:"Admin",
    email:"admin@mail.com",
    role:"admin",
    password:"admin"
}
const UserContextProvider=({children})=>{
    const [userData,setUser] = useState(userDataInfo)
    return<>
     <UserContext.Provider value={{userData,setUser}}>
        {children}
     </UserContext.Provider>
    </>
}
export default UserContextProvider