import React, { useRef } from "react";
import { useAuth } from '.../contexts/AuthContext'

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth()

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>Email</label>
        <input type="email" ref={emailRef} />

        <label>Password</label>
        <input type="password" ref={passwordRef} />

        <label>Confirm your Password</label>
        <input type="password" ref={passwordConfirmRef} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
