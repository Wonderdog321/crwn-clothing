import { useState, useContext } from "react";
import "./sign-in-form.scss";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { UserContext } from "../../contexts/user";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase";
const defaultformFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Email/password incorrect!");
          break;
        case "auth/user-not-found":
          alert("You have not signed up yet.");
          break;
        default:
          console.log(error.code);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    setCurrentUser(user);
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" onClick={SignInWithGoogle} buttonType="google">
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
