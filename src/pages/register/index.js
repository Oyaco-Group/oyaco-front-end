import AuthForm from "../../components/style-components/auth/auth-form";
import AuthImage from "../../components/style-components/auth/auth-image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex flex-wrap overflow-auto">
      <AuthImage />
      <div className="flex flex-col h-screen w-1/2 items-center justify-center bg-blue-400">
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
