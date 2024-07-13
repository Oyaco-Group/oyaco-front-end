import { useRouter } from "next/router";
import Form from "@/components/style-components/form";

export default function Login() {
  const router = useRouter;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     postLoginData(username, password)
  //       .then((data) => {
  //         const { token } = data;
  //         sessionStorage.setItem("accessToken", token);
  //         router.push("/dashboard");
  //         toast({
  //           title: "Login",
  //           description: "You have successfully Login.",
  //           status: "success",
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //       })
  //       .catch((err) => {
  //         const error = new Error(e);
  //         toast({
  //           title: "An error occurred.",
  //           description: error?.message || "An error occurred. Please try again.",
  //           status: "error",
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //       });
  //   };

  return (
    <div className="flex flex-wrap">
      <div className="flex h-screen w-1/2 items-center justify-center bg-blue-400">
        {/* <form className="w-1/2">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold tracking-[1px]">Welcome</h1>
            <p className="mb-10 mt-4 tracking-[1px]">Login to continue</p>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 px-8 py-3.5 text-center text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500 sm:w-auto"
            >
              LOGIN
            </button>
          </div>
        </form> */}
        <Form />
        {/* <Link href=''>Create new account</Link> */}
      </div>
      <div className="flex h-screen w-1/2 flex-col items-center justify-center">
        <div className="h-40">
          <img src="/logo.png" alt="Logo" width={500} height={100} />
        </div>
        <p className="tracking-[1px] text-sky-300">
          Efficiently manage your product stock with ease
        </p>
        <div className="mt-10">
          <img src="/avatar.png" alt="Avatar" width={250} height={250} />
        </div>
      </div>
    </div>
  );
}
