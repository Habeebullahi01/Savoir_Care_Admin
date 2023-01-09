import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginComponent = ({ redPath }) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPass] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPass(e.target.value);
  };
  const getAuthToken = (email: string, password: string) => {
    axios
      .post("https://e-store-server.cyclic.app/auth/login", {
        // .post(`${API_URL}auth/login`, {
        email: email,
        password: password,

        headers: {
          Origin: "https://savoir-care-admin.vercel.app",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.auth) {
          setAuth(res.data.token);
          // router.push("/");
        }

        // console.log(res.data.token);
      })
      .catch((err) => {
        if (err.response) {
          setAuthError(err.response.data.msg);
          console.log(err.response);
        } else {
          console.log(err.response);
        }
        if (!err.response) {
          console.log(err.toJSON());
        }
      });
  };

  return (
    <>
      <div className={`w-full flex flex-row h-[90vh]`}>
        <div className={`form-holder w-full sm:w-1/4 h-full flex flex-col`}>
          <form
            method="POST"
            onSubmit={async (e) => {
              // console.log({ email: name, password: password });
              // console.log(name);
              getAuthToken(name, password);
              router.push(redPath);
              e.preventDefault();
            }}
            className={`flex flex-col items-center mt-[5rem]`}
          >
            <p
              className={`text-[2rem] italic font-semibold mb-4 text-purple-300`}
            >
              Login to continue
            </p>
            <div
              className={`error-container w-full italic bg-slate-500 text-white text-center`}
            >
              <p>{authError}</p>
            </div>
            <label htmlFor="name" className="w-5/6">
              Email
              <input
                type={"text"}
                name={"email"}
                id={"name"}
                placeholder={"Example@email.com"}
                // onChange={(e) => {
                //   handleName(e.target.value);
                //   // console.log(name);
                // }}
                value={name}
                onChange={handleName}
                required={true}
                className={`w-full p-1 my-2  rounded-[5px]  block`}
              />
            </label>
            <label htmlFor="password" className="w-5/6">
              Password
              <input
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"********"}
                onChange={(e) => {
                  handlePassword(e);
                  // console.log(password);
                }}
                required
                className={`w-full p-1 my-2 rounded-[5px] block`}
              />
            </label>
            <button
              type="submit"
              className={`bg-purple-200 p-2 hover:bg-purple-400 w-1/3 self-center rounded`}
            >
              Login
            </button>
          </form>
          <p>
            {`If you don\'t have an account yet, you can create one`}
            <Link href={"/auth/signup"}> here</Link>.
          </p>
        </div>

        <div
          className={`image_holder sm:w-3/4 sm:h-full sm:block bg-slate-600 hidden`}
        ></div>
      </div>
    </>
  );
};

export default LoginComponent;
