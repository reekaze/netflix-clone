/* eslint-disable @next/next/no-img-element */
"use client";
import Input from "@/components/Input";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const AuthPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [variant, setVariant] = useState("login");
  const { toast } = useToast();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const register = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      if (res?.data?.error != null) {
        return toast({
          description: res.data.error,
        });
      }

      login();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.status !== 200) {
        return toast({
          description: res?.error,
        });
      }
      return router.push("/profiles");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              disabled={isLoading}
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              {variant === "login" ? "Login" : "Sign up"}
              {isLoading && (
                <span className="text-white animate-spin">
                  <ImSpinner2 />
                </span>
              )}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/profiles",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/profiles",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already had an account"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
