import { createContext, useContext, useState } from "react";
import { users } from "../data/users";
import {
    getStorageData,
    setStorageData,
    removeStorageData,
} from "../utils/storage";

//Create authentication context
const AuthContext = createContext();

//Authentication provider
export const AuthProvider = ({ children }) => {
    //Restore logged-in user from localStorage
    const [currentUser, setCurrentUser] = useState(() => 
    getStorageData("currentUser", null));

    //login function
    const login = (email) => {
        const normalizedEmail = email.trim().toLowerCase();

        const user = users.find(
            (user) => user.email === normalizedEmail
        );

        if(!user) {
            return {
                success: false,
                message: "User not found. Please enter a valid email.",
            };
       }
       setCurrentUser(user);
        setStorageData("currentUser", user);

        return {
            success: true,
            user,
        };
        };

        const logout = () => {
            setCurrentUser(null);
            removeStorageData("currentUser");
    };

    return (
        <AuthContext.Provider
        value={{
            currentUser,
            login,
            logout,
            isAuthenticated: Boolean(currentUser),
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

//custom hook to use authentication
export const useAuth = () => {
    return useContext(AuthContext);
}
;