"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/components/Shared/Loader/Loader";
import Google from "@/components/Authentication/Google";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    setLoading(true);
    try {
      const signRes = await signIn("credentials", {
        ...user,
        redirect: false,
        callbackUrl: "/",
      });

      if (signRes?.status === 200) {
        router.push("/");
      } else if (signRes?.error) {
        toast({
          variant: "destructive",
          title: signRes?.error,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid",
        });
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <div className="container mx-auto grid place-content-center min-h-[90vh]">
        <div className="border-2 border-primary px-4 py-16 rounded-lg">
          <h2 className="text-4xl text-center font-semibold mb-6">Login</h2>
          <Google title="Login" />
          <form
            onSubmit={handleSignin}
            className="flex flex-col gap-3 md:min-w-96 mt-3"
          >
            <Input type="email" name="email" required placeholder="Email" />
            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Login"}
            </Button>
          </form>
          <span className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-primary text-sm mt-3">
              {" "}
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Page;
