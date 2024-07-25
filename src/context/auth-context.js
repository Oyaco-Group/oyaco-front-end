import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProfileUser } from "@/fetching/user";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !profileFetched) {
      fetchProfileUser()
        .then((userData) => {
          setUser(userData);
          redirectBasedOnRole(userData.user_role);
          setProfileFetched(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          router.push("/login");
        });
    }
  }, [router, profileFetched]);

  const login = async (token) => {
    try {
      localStorage.setItem("access_token", token);
      const userData = await fetchProfileUser();
      setUser(userData);
      redirectBasedOnRole(userData.user_role);
      router.push("/");
    } catch (error) {
      console.error("Failed to fetch user profile after login:", error);
      toast.error("Invalid credential");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout");
    }
  };

  const redirectBasedOnRole = (role) => {
    console.log(role);
    if (role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/product-list");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
