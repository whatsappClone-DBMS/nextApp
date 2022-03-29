import React from "react";
import Header from "../Components/Header/Header";
import SignUp from "../Components/SignUp/SignUp";
import styles from "../styles/Home.module.css";

function signupPage() {
  return (
    <div>
      <Header />
      <SignUp />
    </div>
  );
}

export default signupPage;
