import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import CheckboxField from "@/components/style-components/form/checkbox-field";
import Button from "@/components/style-components/button";
import { toast } from "react-toastify";
import { register, login } from "@/fetching/auth";

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    user_role: "",
    agree: false,
  });

  const { login: loginUser } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Jika tipe adalah "register", tambahkan user_role ke formData
    const submitData =
      type === "register" ? { ...formData, user_role: "user" } : formData;

    if (type === "register") {
      try {
        const response = await register(submitData); // Kirim submitData yang sudah diubah
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          user_role: "user", // Reset ke default value
          agree: false,
        });
        router.push("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    } else if (type === "login") {
      try {
        const { email, password } = formData;
        if (!email || !password) {
          throw new Error("Please input both email and password");
        }
        const response = await login({ email, password });
        const { token, user } = response.data;

        // Simpan token dan data pengguna ke context dan localStorage
        loginUser(user, token);

        toast.success(response.message);
        if (response.user_role == "admin") {
          router.push("/dashboard");
        } else {
          router.push("/product-list");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold tracking-[1px]">
          {type === "login" ? "Welcome" : "Register"}
        </h1>
        <p className="mb-10 mt-4 tracking-[1px]">
          {type === "login" ? "Login to continue" : "Create a new account"}
        </p>
      </div>
      {type === "register" && (
        <InputField
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
        />
      )}
      <InputField
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <InputField
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {type === "register" && (
        <>
          <TextareaField
            id="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            placeholder="Write your address here..."
          />
          <CheckboxField
            id="agree"
            checked={formData.agree}
            onChange={handleChange}
            label="I agree with the"
            link="#"
          />
        </>
      )}
      <div
        className={`flex ${type === "login" ? "justify-center" : "justify-end"}`}
      >
        <Button type="submit">{type === "login" ? "LOGIN" : "REGISTER"}</Button>
      </div>
    </form>
  );
};

export default AuthForm;
