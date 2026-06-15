import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";

const AuthContext =
    createContext();

export const AuthProvider = ({
    children,
}) => {
    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const checkAuth =
            async () => {
                try {
                    const res =
                        await api.get(
                            "/auth/me"
                        );

                    setUser(
                        res.data.user
                    );
                } catch {
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            };

        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
    };

    const logout = async () => {
        try {
            await api.post(
                "/auth/logout"
            );
        } catch (error) {
            console.log(error);
        }

        setUser(null);

        localStorage.removeItem(
            "user"
        );
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);