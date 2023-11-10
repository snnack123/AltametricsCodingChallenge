import AltametricsLogo from "../assets/Altametrics_logo.webp";

export default function Homepage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src={AltametricsLogo}
        alt="Altametrics Logo"
        className="h-auto w-96 mx-auto mb-10"
      />
      <h1 className="text-4xl md:text-5xl font-bold underline text-center text-gray-800 mb-6">
        Welcome to Altametrics Coding Challenge
      </h1>
    </div>
  );
}
