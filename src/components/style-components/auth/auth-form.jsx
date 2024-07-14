import { useState, useEffect } from "react";

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "",
    agree: false,
  });

  useEffect(() => {
    const selectElement = document.getElementById("role");
    if (selectElement) {
      if (formData.role === "") {
        selectElement.classList.add("text-gray-400");
      } else {
        selectElement.classList.remove("text-gray-400");
      }
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
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
      <div className="mb-5">
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Username"
          required
        />
      </div>
      {type === "register" && (
        <div className="mb-5">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Email"
            required
          />
        </div>
      )}
      <div className="mb-5">
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Password"
          required
        />
      </div>
      {type === "register" && (
        <>
          <div className="mb-5">
            <textarea
              id="address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Write your address here..."
            ></textarea>
          </div>
          <div className="mb-5">
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a role account</option>
              <option value="admin" className="text-gray-900">
                Admin
              </option>
              <option value="user" className="text-gray-900">
                User
              </option>
            </select>
          </div>
          <div className="mb-6 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-400 bg-gray-50"
                required
              />
            </div>
            <label
              htmlFor="agree"
              className="ms-2 text-sm font-medium text-white"
            >
              I agree with the{" "}
              <a href="#" className="text-blue-800 hover:underline">
                terms and conditions.
              </a>
            </label>
          </div>
        </>
      )}
      <div
        className={`flex ${type === "login" ? "justify-center" : "justify-end"}`}
      >
        <button
          type="submit"
          className="w-full rounded-lg bg-amber-500 px-6 py-4 text-center text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500 sm:w-auto"
        >
          {type === "login" ? "LOGIN" : "REGISTER"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
