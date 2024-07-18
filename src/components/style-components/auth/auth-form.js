// src/components/style-components/auth-form.js
import { useState } from "react";
import { useRouter } from "next/router";
import InputField from "@/components/style-components/form/input-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import CheckboxField from "@/components/style-components/form/checkbox-field";
import Button from "@/components/style-components/button";
// import { ToastSuccess, ToastDanger } from "@/components/style-components/toast";
import { register } from "@/fetching/auth"; // Import fungsi register

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    agree: false,
  });

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
    if (type === "register") {
      try {
        const response = await register(formData);
        console.log(response);
        // toastSuccess("Registration successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          address: "",
          agree: false,
        });
        router.push("/login"); // Arahkan ke halaman login atau halaman lain
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle login
    }
  };

  // const toastSuccess = (message) => {
  //   return <ToastSuccess message={message} />;
  // };

  // const toastDanger = (message) => {
  //   return <ToastDanger message={message} />;
  // };

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
