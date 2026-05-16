import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617]">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-150px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[160px]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-1000" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
