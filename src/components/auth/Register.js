import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../helpers/googleAuth";
import { emailAuth } from "../helpers/emailAuth";
import "./Login.css";
import { useQueryClient } from "react-query";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const queryClient = useQueryClient();

  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = document.getElementById("registerForm");
    if (form.checkValidity()) {
      emailAuth.register(user, navigate, queryClient);
    } else {
      form.reportValidity();
    }
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  // Register with google (same as sign in)
  const onSubmitLogin = async () => {
    googleAuth.signInRegister(user, navigate, queryClient);
  };

  return (
    <main className="">
      <section className="md:max-w-3xl mx-auto">
        <h1 className="dark:text-white mb-4">Register</h1>
        <form id="registerForm" onSubmit={handleRegister}>
          <fieldset className="mb-6">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              id="fullName"
              onChange={(e) => updateUser(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Full Name"
              required
            />
          </fieldset>
          <fieldset className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => updateUser(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gizmmo.com"
              required
            />
          </fieldset>
          <fieldset className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              minLength="6"
              onChange={(e) => updateUser(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Must Be 6 Characters"
            />
          </fieldset>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <h2 className="mt-8 dark:text-white">Or</h2>
        <button
          type="submit"
          onClick={onSubmitLogin}
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login with Google
        </button>
      </section>
    </main>
  );
};
