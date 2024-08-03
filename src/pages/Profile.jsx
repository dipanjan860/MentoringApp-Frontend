import React from "react";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";

function Profile() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const navigateback = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        background: isSmallScreen
          ? "white"
          : "linear-gradient(#292929, #504C4C)",
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 0, sm: 6 } }}>
        <Paper elevation={isSmallScreen ? 0 : 3} sx={{ p: 4, borderRadius: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <IconButton onClick={navigateback}>
              <KeyboardBackspaceIcon style={{ fontSize: "24px" }} />
            </IconButton>
          </Box>

          <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Avatar
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
                sx={{ width: 160, height: 160, mx: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign={{ xs: "center", md: "left" }}
              >
                Name Surname
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign={{ xs: "center", md: "left" }}
              >
                Occupation
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          <Grid container spacing={4} sx={{ py: 4 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mx: 2 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  mb={4}
                >
                  Experience
                  <Link to="/experience">
                    <IconButton>
                      <EditIcon style={{ fontSize: "24px" }} />
                    </IconButton>
                  </Link>
                </Typography>
                {[
                  {
                    company: "Company 1",
                    duration: "3 months",
                    designation: "Designation",
                  },
                  {
                    company: "Company 2",
                    duration: "2 years 6 months",
                    designation: "Designation",
                  },
                  {
                    company: "Company 3",
                    duration: "1 year",
                    designation: "Designation",
                  },
                ].map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="medium">
                      {exp.company}
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 2 }}
                      >
                        {exp.duration}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {exp.designation}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {isMediumScreen && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Box sx={{ mx: 2 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  mb={4}
                >
                  Education
                  <Link to="/education">
                    <IconButton>
                      <EditIcon style={{ fontSize: "24px" }} />
                    </IconButton>
                  </Link>
                </Typography>
                {[
                  {
                    degree: "M.Tech",
                    year: "2024",
                    institute: "RCC Institute of Information Technology",
                  },
                  {
                    degree: "B.Tech",
                    year: "2022",
                    institute: "Institute Name",
                  },
                  {
                    degree: "12th",
                    year: "2018",
                    institute: "Institute Name",
                  },
                  {
                    degree: "10th",
                    year: "2016",
                    institute: "Institute Name",
                  },
                ].map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="medium">
                      {edu.degree}
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 2 }}
                      >
                        {edu.year}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {edu.institute}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider />

          <Box sx={{ py: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              mb={4}
            >
              Skills
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
              {["Java", "Python", "JavaScript", "HTML", "CSS"].map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="default"
                  sx={{ fontSize: "16px", fontWeight: "bold", px: 3 }}
                />
              ))}
            </Box>
          </Box>

          <Divider />

          <Box sx={{ py: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              mb={4}
            >
              Reviews
            </Typography>
            <Grid container spacing={4}>
              {[
                { name: "Holden Caulfield", title: "UI DEVELOPER" },
                { name: "Alper Kamu", title: "GRAPHIC DESIGNER" },
                { name: "Holden Kamu", title: "UX DEVELOPER" },
                { name: "Alper Caulfield", title: "SOFTWARE DEVELOPER" },
              ].map((review, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{ p: 4, borderRadius: 2, height: "100%" }}
                  >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt=""
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {review.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {review.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;
