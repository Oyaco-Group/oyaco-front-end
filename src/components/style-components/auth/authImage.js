const AuthImage = () => {
  return (
    <div className="flex h-screen w-1/2 flex-col items-center justify-center">
      <div className="mt-[-150px] h-40">
        <img src="/logo.png" alt="Logo" width={500} height={100} />
      </div>
      <p className="mt-4 tracking-[1px] text-sky-400">
        Efficiently manage your product stock with ease
      </p>
      <div className="mt-10">
        <img src="/avatar.png" alt="Avatar" width={250} height={250} />
      </div>
    </div>
  );
};

export default AuthImage;
