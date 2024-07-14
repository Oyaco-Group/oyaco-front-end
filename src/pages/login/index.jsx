import AuthForm from "../../components/style-components/auth/auth-form";
import AuthImage from "../../components/style-components/auth/auth-image";

const LoginPage = () => {
  return (
    <div className="flex flex-wrap overflow-auto">
      <div className="flex h-screen w-1/2 items-center justify-center bg-blue-400">
        <AuthForm type="login" />
      </div>
      <AuthImage />
    </div>
  );
};

export default LoginPage;
