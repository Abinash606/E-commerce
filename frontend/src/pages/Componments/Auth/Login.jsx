/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { css } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import NavigationLink from "../NavigationLinks";
import Header from "../Header";
import Link from "next/link";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

const formContainerStyle = css`
  max-width: 360px;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-bottom: 40px;
  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const formFieldStyle = css`
  width: 100%;
  margin: 8px 0;
`;

const smallerFormFieldStyle = css`
  width: calc(100% - 16px);
  margin: 8px 0;
`;

const lineStyle = css`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 16px 0;
`;

const linkStyle = css`
  color: gray;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const buttonStyle = css`
  width: 100%;
  max-width: 200px;
  min-width: 150px;
  margin: 20px auto;
  background-color: white;
  color: black;
  border: 1px solid gray;
  &:hover {
    background-color: black;
    color: white;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

const buttonStyle2 = css`
  width: 100%;
  max-width: 200px;
  min-width: 150px;
  margin: 20px auto;
  background-color: black;
  color: white;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

const bottomLinksStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const textFieldStyle = {
  "& .MuiInputBase-root": {
    borderColor: "gray !important",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "gray !important",
  },
  "& .MuiInputLabel-root": {
    color: "gray !important",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "gray !important",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "gray !important",
  },
};
const toastStyle = {
  position: "fixed",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "0.75rem",
  borderRadius: "4px",
  padding: "10px 20px",
};

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isRegistering) {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirmation: "",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
    }
  }, [isRegistering]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, firstName, lastName, password, passwordConfirmation } =
      formData;

    if (isRegistering) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v2/storefront/account",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                password_confirmation: passwordConfirmation,
              },
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          await toast.success("Registration successful!", {
            style: toastStyle,
          });
          setIsRegistering(false);
        } else {
          toast.error("Registration failed: " + result.error, {
            style: toastStyle,
          });
        }
      } catch (error) {
        toast.error("Error during registration: " + error.error, {
          style: toastStyle,
        });
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:3000/spree_oauth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grant_type: "password",
              username: email,
              password: password,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          await toast.success("Login successful!", {
            style: toastStyle,
          });
          localStorage.setItem("access_token", result.access_token);
          localStorage.setItem("refresh_token", result.refresh_token);
          console.log(result.access_token);
          localStorage.setItem("userEmail", email);
          setFormData({
            email: "",
            password: "",
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
          console.log(result);
        } else {
          toast.error("Login failed: " + result.error_description, {
            style: toastStyle,
          });
        }
      } catch (error) {
        toast.error("Error during login: " + error.error, {
          style: toastStyle,
        });
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLink />

      <Typography
        gutterBottom
        align="center"
        sx={{
          fontWeight: 400,
          mt: 1,
          color: "rgba(0, 0, 0, 0.9)",
        }}
      >
        {isRegistering ? "Register Now" : "Welcome"}
      </Typography>

      <Box css={lineStyle} />
      <Box mb={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          css={buttonStyle}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Back to Login" : "I'm new to THE OUTNET"}
        </Button>
      </Box>

      <form css={formContainerStyle} onSubmit={handleSubmit}>
        {isRegistering ? (
          <>
            <TextField
              name="firstName"
              css={smallerFormFieldStyle}
              margin="normal"
              label="First Name"
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
            />
            <TextField
              name="lastName"
              css={smallerFormFieldStyle}
              margin="normal"
              label="Last Name"
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
            />
            <TextField
              name="email"
              css={smallerFormFieldStyle}
              margin="normal"
              label="Email"
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
            />
            <TextField
              name="password"
              css={smallerFormFieldStyle}
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="passwordConfirmation"
              css={smallerFormFieldStyle}
              margin="normal"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                css={buttonStyle2}
                fullWidth
              >
                Register
              </Button>
            </Box>
          </>
        ) : (
          <>
            <TextField
              name="email"
              css={formFieldStyle}
              margin="normal"
              label="Email"
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
            />
            <TextField
              name="password"
              css={formFieldStyle}
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              sx={textFieldStyle}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                css={buttonStyle2}
                fullWidth
              >
                Login
              </Button>
            </Box>
          </>
        )}

        <Box css={bottomLinksStyle}>
          <Link href="/forgot-password" passHref>
            Forgot Password?
          </Link>
          <Link href="/signup" passHref>
            Create an account
          </Link>
        </Box>
      </form>
      <TopFooter />
      <Footer />
    </Box>
  );
}

export default Login;
