import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = ({ title }: { title: string }) => {
  return (
    <div className="space-y-1 text-gray-800 text-sm">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="border border-input rounded w-full flex items-center justify-center p-1 gap-3"
      >
        <FcGoogle size={20} /> {title} with google
      </button>
    </div>
  );
};

export default Google;
