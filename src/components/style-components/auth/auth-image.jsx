import Image from "next/image";

const AuthImage = () => {
  return (
    <div className="flex h-screen w-1/2 flex-col items-center justify-center">
      <div className="h-40">
        <Image src="/logo.png" alt="Logo" width={500} height={100} />
      </div>
      <p className="mt-4 tracking-[1px] text-sky-300">
        Efficiently manage your product stock with ease
      </p>
      <div className="mt-10">
        <Image src="/avatar.png" alt="Avatar" width={250} height={250} />
      </div>
    </div>
  );
};

export default AuthImage;
