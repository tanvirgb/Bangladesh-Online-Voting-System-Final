import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const ElectionAdminLogin = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/electionAdmin",
        {
          email,
          password,
          login: true,
        }
      );
      const { data } = response;
      if (data) {
        const { result }: any = data;
        delete result.password;
        localStorage.setItem("electionAdmin", JSON.stringify(result));
        router.push("/electionAdmin/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-6 text-center">Login</h3>
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        {session ? (
          <div className="px-8 py-6">
            <p>Signed in as {session.user?.email || "unknown user"}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <form className="px-8 py-6" onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              {error && !email && (
                <span className="text-red-500 text-sm mt-1">
                  Please enter a valid email
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              {error && !password && (
                <span className="text-red-500 text-sm mt-1">
                  Please enter a valid password
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                Login
              </button>
            </div>
          </form>
        )}
      </div>
      {!session && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mx-2"
            onClick={() => signIn("github")}
          >
            Sign in using Github
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mx-2"
            onClick={() => signIn("google")}
          >
            Sign in using Google
          </button>
        </div>
      )}
    </>
  );
};

export default ElectionAdminLogin;
