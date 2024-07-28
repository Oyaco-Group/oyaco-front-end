import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import InputField from "@/components/style-components/form/inputField";
import TextareaField from "@/components/style-components/form/textareaField";
import CheckboxField from "@/components/style-components/form/checkboxField";
import Button from "@/components/style-components/button";
import { toast } from "react-toastify";
import { register, login } from "@/fetching/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
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

    if (type === "register") {
      try {
        const response = await register({
          ...formData,
          user_role: "user",
        });
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
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
        const { access_token } = response.data;

        loginUser(access_token);

        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <div className="relative">
        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
          ) : (
            <AiOutlineEye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
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
          <div className="flex gap-2 w-full justify-center my-6 text-white font-normal">
            <p>Already have an account?</p>
            <Link href="/login" className="text-blue-700">
              Login
            </Link>
          </div>
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
