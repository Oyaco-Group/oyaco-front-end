import Link from "next/link";
import AuthForm from "../../components/style-components/auth/authForm";
import AuthImage from "../../components/style-components/auth/authImage";

const LoginPage = () => {
  return (
    <div className="flex flex-wrap overflow-auto">
      <div className="flex flex-col gap-10 text-white h-screen w-1/2 items-center justify-center bg-blue-400">
        <AuthForm type="login" />
        <Link href="/register">Create a new account</Link>
      </div>
      <AuthImage />
    </div>
  );
};

export default LoginPage;
