import { AuthSocialButton } from "../components/AuthSocialButton";

export default function Home() {
  return (
    <div
      className="
    flex
    min-h-full
    flex-col
    justify-center
    items-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    "
    >
      <div className="sm:max-auto sm:w-full sm:max-w-d">
        <h2
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-grey-900
        "
        >
          Sign In To Your Account
        </h2>
      </div>
      <AuthSocialButton />
    </div>
  );
}
