import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "src/Components/Global/Button";
import rocketTicket from "src/Assets/images/rocketTicket.svg";
import { LayoutWithHeader } from "src/Components/";
import { Input } from "src/Components";

import { API_USER_REGISTER } from "src/Common/services/register";

import "./Register.scss";
import { LinkList } from "src/types";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [RegisterInProgress, setRegisterInProgress] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    setError("");
    setRegisterInProgress(true);

    API_USER_REGISTER(email, pass)
      .then(() => navigate(LinkList.Login))
      .catch((err) => {
        setRegisterInProgress(false);

        if (err.data.error.faults[0].includes("Duplicate entry")) {
          setError(`${email} user exists.`);
        } else if (err) {
          setError(err.data.error.message);
        } else {
          setError(
            `We're experiencing some internal problems. Try in few minutes`
          );
        }
      });
  };

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <LayoutWithHeader>
      <div className="Register">
        <div className="Register__content">
          <p className="Register__title">Sign up to Potato</p>

          <Input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="Register__input"
          />

          <Input
            name="password"
            type="password"
            value={pass}
            onChange={handlePassChange}
            placeholder="Password"
            error={error}
            className="Register__input"
          />

          <Button
            textWeight="heavy"
            className="Register__button"
            type="submit"
            onClick={handleRegister}
          >
            {RegisterInProgress ? "Signing up  ..." : "Sign up"}
          </Button>

          <img
            className="Register__img"
            src={rocketTicket}
            alt="rocketTicket"
          />

          <p className="Register__teaser">
            By continuing, you agree to Potato's{" "}
            <Link
              to={LinkList.TermsAndConditions}
              className="Register__teaser-link"
            >
              Terms of Use
            </Link>{" "}
            and confirm that you have read Potato's{" "}
            <Link to={LinkList.PrivacyPolicy} className="Register__teaser-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Register;
