import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { emailValidator } from "../utils/validators";
import Title from "../components/shared/Title";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const email = useInputValidation("", emailValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/user-details");
  };

  return (
    <div
      style={{
        background: isSmallScreen
          ? "white"
          : "linear-gradient(#292929, #504C4C)",
      }}
    >
      <Title title={"Mentoring App - Login"} />

      <Container
        component={"main"}
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          marginBottom="1rem"
          color="white"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Mentoring App
        </Typography>

        <Paper
          elevation={isSmallScreen ? 0 : 3}
          sx={{
            padding: {
              xs: 2,
              sm: 4,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>

              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email.value}
                  onChange={email.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#525050",
                    "&:hover": {
                      backgroundColor: "#403E3E",
                    },
                  }}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  Don't have an account?
                </Typography>

                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>

              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      ":hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />

                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email.value}
                  onChange={email.changeHandler}
                />
                {email.error && (
                  <Typography color="error" variant="caption">
                    {email.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#525050",
                    "&:hover": {
                      backgroundColor: "#403E3E",
                    },
                  }}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  Already have an account?
                </Typography>

                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
