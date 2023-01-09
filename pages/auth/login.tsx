import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import LoginComponent from "../../components/Login";

const Login = () => {
  return <LoginComponent redPath={"/"} />;
};

export default Login;
