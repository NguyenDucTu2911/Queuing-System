import { getAuth, User } from "firebase/auth";
import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { },
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser?.uid) {
                setUser(authUser);
                const token = await authUser.getIdToken()
                localStorage.setItem("accessToken", token);
                return;
            }

            setUser(null);
            localStorage.clear();
            navigate("/login")
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
