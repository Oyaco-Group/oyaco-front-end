import { useState } from "react";
import { useRouter } from "next/router";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import SelectField from "@/components/style-components/form/select-field";
import CheckboxField from "@/components/style-components/form/checkbox-field";
import Button from "@/components/style-components/button";
import { ToastSuccess, ToastDanger } from "@/components/style-components/toast"; // Pastikan path sesuai dengan struktur proyek Anda

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "",
    agree: false,
  });

  const [users, setUsers] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = () => {
    const existingUser = users.find((user) => user.email === formData.email);
    if (existingUser) {
      // Email sudah terdaftar
      return false;
    }
    setUsers([...users, formData]);
    return true;
  };

  const handleLogin = () => {
    const user = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password,
    );
    return user;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "register") {
      const registered = handleRegister();
      if (registered) {
        // Tampilkan toast registrasi berhasil
        setFormData({
          username: "",
          email: "",
          password: "",
          address: "",
          role: "",
          agree: false,
        });
        toastSuccess("Registration successful!");
      } else {
        // Tampilkan toast email sudah terdaftar
        toastDanger("Email is already registered!");
      }
    } else {
      const user = handleLogin();
      if (user) {
        // Tampilkan toast login berhasil
        toastSuccess("Login successful!");
        router.push("/dashboard");
      } else {
        // Tampilkan toast kredensial tidak valid
        toastDanger("Invalid credentials");
      }
    }
  };

  const toastSuccess = (message) => {
    // Tampilkan toast success, misalnya dengan menggunakan komponen ToastSuccess
    return <ToastSuccess message={message} />;
  };

  const toastDanger = (message) => {
    // Tampilkan toast danger, misalnya dengan menggunakan komponen ToastDanger
    return <ToastDanger message={message} />;
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
      <InputField
        id="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {type === "register" && (
        <InputField
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      )}
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
          <SelectField
            id="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
            placeholder="Choose a role account"
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
