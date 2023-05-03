import { faUserLock } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { SetStateAction, useState } from "react";

function ArtistLogin() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorEmailParams, setErrorEmailParams] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorPasswordParams, setErrorPasswordParams] = useState("");

  function emailErrorHelper(message: SetStateAction<string>) {
    setEmailError(true);
    setErrorEmailParams(message);
  }
  function passwordErrorHelper(message: SetStateAction<string>) {
    setPasswordError(true);
    setErrorPasswordParams(message);
  }
  const errorHandling = () => {
    if (email === "") emailErrorHelper("Email cannot be empty");
    else if (password === "") passwordErrorHelper("Password cannot be empty");
    else if (password.length < 6)
      passwordErrorHelper("Password must be more than 6 characters");
    else if (password.length > 20)
      passwordErrorHelper("Password must be less than 20 characters");
    else if (password.includes(" "))
      passwordErrorHelper("Password cannot contain spaces");
    else if (email.includes(" "))
      emailErrorHelper("Email cannot contain spaces");
    else if (!email.includes("@")) emailErrorHelper("Email must contain @");
    else if (!email.includes(".")) emailErrorHelper("Email must contain .");
    else handleLogin();
  };
  const handleLogin = () => {
    supabase.auth.signInWithPassword({ email, password }).then((res) => {
      if (res.error) {
        console.log(res.error.message);
        if (res.error.message === "Invalid login credentials") {
          emailErrorHelper("Invalid login credentials");
          passwordErrorHelper("Invalid login credentials");
        }
        if (res.error.message === "auth/invalid-email") {
          setEmailError(true);
          setErrorEmailParams("Invalid Email");
        }
        if (res.error.message === "auth/wrong-password") {
          setPasswordError(true);
          setErrorPasswordParams("Wrong Password");
        }
      }
      if (res.data.user) {
        fetch(`/api/loginArtist?id=${res.data.user.id}`)
          .then((res) => {
            res.json().then((data) => {
              if (data[0] === undefined) {
                emailErrorHelper("Not valid Artist Account");
                passwordErrorHelper("Not valid Artist Account");
                return;
              } else {
                localStorage.setItem("artist", JSON.stringify(data[0]));
                window.dispatchEvent(new Event("artistUpdated"));
                router.push("/artist/dashboard");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-full h-fit md:h-[100svh] bg-[#3D4A4C] ">
      <div className="h-[30%] flex flex-col items-center justify-center">
        <h2 className="text-6xl text-white pt-32 font-righteous">
          Artist Login
        </h2>
      </div>
      <div className="w-full md:h-[70%] h-full flex md:flex-row items-center justify-evenly flex-col">
        <div className="h-full md:w-[50%] w-full flex flex-col items-start justify-around pl-10">
          <div className="w-full text-left md:mt-0 mt-10">
            <h2 className="text-3xl text-white font-righteous ">Email</h2>
            <input
              type={"email"}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className={`h-[40px] md:w-[60%] w-[90%] rounded-lg bg-[#D9D9D9] p-4 text-left  text-[20px] outline-none mt-4 font-righteous border-2 ${
                emailError ? " border-red-600 " : " border-transparent "
              } transition-all ease-in-out duration-300`}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            ></input>
            <p
              className={`${
                emailError ? "text-red-600 " : "text-transparent "
              }text-lg  font-righteous mt-3 ml-5 transition-all ease-in-out duration-300`}
            >
              {emailError ? "Error: ".concat(errorEmailParams) : "No Error"}
            </p>
          </div>
          <div className="w-full text-left md:mt-0 mt-5">
            <h2 className="text-3xl text-white font-righteous w-full">
              Password
            </h2>
            <input
              type={"password"}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className={`h-[40px] md:w-[60%] w-[90%] rounded-lg bg-[#D9D9D9] p-4 text-left  text-[20px] outline-none mt-4 font-righteous border-2 ${
                passwordError ? " border-red-600 " : " border-transparent "
              } transition-all ease-in-out duration-300`}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            ></input>
            <p
              className={`${
                passwordError ? "text-red-600 " : "text-transparent "
              }text-lg  font-righteous mt-3 ml-5 transition-all ease-in-out duration-300`}
            >
              {passwordError
                ? "Error: ".concat(errorPasswordParams)
                : "No Error"}
            </p>
          </div>
          <div
            className="w-fit h-fit group hover:cursor-pointer md:block hidden"
            onClick={() => {
              errorHandling();
            }}
          >
            <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:mt-0 mt-5">
              <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
                Login
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-fit h-fit group hover:cursor-pointer md:hidden block"
          onClick={() => {
            errorHandling();
          }}
        >
          <div className="group-hover:bg-white bg-[#1A2020] flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:mt-0 mt-5">
            <p className="font-righteous text-white group-hover:text-[#1A2020] text-3xl p-5 pl-7 pr-7 transition-all ease-in-out duration-300">
              Login
            </p>
          </div>
        </div>
        <div className="md:h-[90%] h-full md:w-[50%] w-full md:border-l-4 border-white flex flex-col items-center justify-center md:mt-0 mt-5">
          <FontAwesomeIcon
            icon={faUserLock as IconProp}
            className="text-white md:text-[200px] text-[150px] pb-10"
          />
        </div>
      </div>
    </div>
  );
}

export default ArtistLogin;
