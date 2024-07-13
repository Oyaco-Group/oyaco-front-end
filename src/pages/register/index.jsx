export default function RegisterPage() {
  return (
    <div className="flex flex-wrap">
      {/* Left side image */}
      <div className="flex h-screen w-1/2 flex-col items-center justify-center">
        <div className="h-40">
          <img
            src="/logo.png" // Path relatif dari folder public
            alt="logo"
            width={500} // Sesuaikan dengan lebar gambar yang diinginkan
            height={100} // Sesuaikan dengan tinggi gambar yang diinginkan
          />
        </div>
        <p className="tracking-[1px] text-blue-300">
          Efficiently manage your product stock with ease
        </p>
        <div className="mt-10">
          <img
            src="/avatar.png" // Path relatif dari folder public
            alt="Avatar"
            width={250} // Sesuaikan dengan lebar gambar yang diinginkan
            height={250} // Sesuaikan dengan tinggi gambar yang diinginkan
          />
        </div>
      </div>

      {/* Right side form register */}
      <div className="flex h-screen w-1/2 items-center justify-center bg-blue-400">
        <form className="w-1/2">
          <h1 className="mb-6 text-4xl font-semibold text-white">Register</h1>
          <div className="mb-6">
            <input
              type="text"
              id="Username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="confirm_password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              id="message"
              rows="4"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write your address here..."
            ></textarea>
          </div>
          <div className="mb-6">
            <select
              id="role-account"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>Choose a role account</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-6 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border bg-gray-50"
                required
              />
            </div>
            <label
              for="remember"
              className="ms-2 text-sm font-medium text-white"
            >
              I agree with the{" "}
              <a href="#" className="hover:underlin text-blue-800">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500 sm:w-auto"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
