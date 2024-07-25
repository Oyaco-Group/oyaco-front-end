import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProfileUser } from "@/fetching/user";

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
          setUser(userData); // Pastikan userData memiliki user_role
          redirectBasedOnRole(userData.user_role); // Tambahkan fungsi ini jika perlu
          setProfileFetched(true); // Set flag bahwa profil sudah diambil
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
      setUser(userData); // Pastikan userData memiliki user_role
      redirectBasedOnRole(userData.user_role); // Tambahkan fungsi ini jika perlu
      router.push("/"); // Redirect ke halaman utama setelah login
    } catch (error) {
      console.error("Failed to fetch user profile after login:", error);
      // Handle error: misalnya, tampilkan pesan kesalahan
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setUser(null);
      router.push("/login"); // Redirect ke halaman login setelah logout
    } catch (error) {
      console.error("Failed to logout:", error);
      // Handle error: misalnya, tampilkan pesan kesalahan
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
