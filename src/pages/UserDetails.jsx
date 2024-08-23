import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Title from "../components/shared/Title";
import axios from 'axios';

const UserDetails = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occupation: "",
    educationSections: [
      { degree: "", major: "", minor: "", institution: "", yearOfPassing: "" },
    ],
    experienceSections: [
      {
        companyName: "",
        designation: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        currentlyWorking: false,
      },
    ],
    skills: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducationSections = [...formData.educationSections];
    newEducationSections[index][name] = value;
    setFormData({
      ...formData,
      educationSections: newEducationSections,
    });
  };

  const handleAddEducationSection = () => {
    setFormData({
      ...formData,
      educationSections: [
        ...formData.educationSections,
        {
          degree: "",
          major: "",
          minor: "",
          institution: "",
          yearOfPassing: "",
        },
      ],
    });
  };

  const handleRemoveEducationSection = (index) => {
    const newEducationSections = [...formData.educationSections];
    newEducationSections.splice(index, 1);
    setFormData({
      ...formData,
      educationSections: newEducationSections,
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newExperienceSections = [...formData.experienceSections];
    newExperienceSections[index][name] = type === "checkbox" ? checked : value;

    if (name === "currentlyWorking") {
      if (checked) {
        const currentDate = new Date();
        newExperienceSections[index]["toMonth"] = currentDate.getMonth() + 1;
        newExperienceSections[index]["toYear"] = currentDate.getFullYear();
      } else {
        newExperienceSections[index]["toMonth"] = "";
        newExperienceSections[index]["toYear"] = "";
      }
    }

    setFormData({
      ...formData,
      experienceSections: newExperienceSections,
    });
  };

  const handleAddExperienceSection = () => {
    setFormData({
      ...formData,
      experienceSections: [
        ...formData.experienceSections,
        {
          companyName: "",
          designation: "",
          fromMonth: "",
          fromYear: "",
          toMonth: "",
          toYear: "",
          currentlyWorking: false,
        },
      ],
    });
  };

  const handleRemoveExperienceSection = (index) => {
    const newExperienceSections = [...formData.experienceSections];
    newExperienceSections.splice(index, 1);
    setFormData({
      ...formData,
      experienceSections: newExperienceSections,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.occupation) {
      validationErrors.occupation = "Please select your occupation!";
    }

    formData.educationSections.forEach((section, index) => {
      if (!section.degree) {
        validationErrors[`degree${index}`] = "Degree is required!";
      }
      if (!section.major || !section.major.trim()) {
        validationErrors[`major${index}`] = "Major is required!";
      }
      if (!section.institution || !section.institution.trim()) {
        validationErrors[`institution${index}`] = "Institution is required!";
      }
      if (!section.yearOfPassing || !section.yearOfPassing.trim()) {
        validationErrors[`yearOfPassing${index}`] =
          "Year of passing is required!";
      }
    });

    formData.experienceSections.forEach((section, index) => {
      if (!section.companyName.trim()) {
        validationErrors[`companyName${index}`] = "Company Name is required!";
      }
      if (!section.designation.trim()) {
        validationErrors[`designation${index}`] = "Designation is required!";
      }
      if (!section.fromMonth) {
        validationErrors[`fromMonth${index}`] = "From Month is required!";
      }
      if (!section.fromYear.trim()) {
        validationErrors[`fromYear${index}`] = "From Year is required!";
      }
      if (!section.currentlyWorking) {
        if (!section.toMonth) {
          validationErrors[`toMonth${index}`] = "To Month is required!";
        }
        if (!section.toYear.trim()) {
          validationErrors[`toYear${index}`] = "To Year is required!";
        }
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      console.log(formData.occupation.toLowerCase());
      const url = `http://localhost:8000/api/v1/${formData.occupation.toLowerCase()}/profile/`; 
      axios.post(url, {
        department: formData.educationSections[0].major,
        college_name: formData.educationSections[0].institution,
        passout_year: formData.educationSections[0].yearOfPassing,
        job_role: formData.experienceSections[0].designation,
        company_name: formData.experienceSections[0].companyName,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        background: isSmallScreen
          ? "white"
          : "linear-gradient(#292929, #504C4C)",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Title title={"Mentoring App - User Details"} />

      <Container component={"main"} maxWidth="md">
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
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>

          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" gutterBottom>
              Occupation
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="occupation-label">Occupation*</InputLabel>

              <Select
                labelId="occupation-label"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                label="Occupation*"
              >
                <MenuItem value="Mentor">Mentor</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </Select>
              {errors.occupation && (
                <Typography color="error" variant="caption">
                  {errors.occupation}
                </Typography>
              )}
            </FormControl>

            <Typography
              sx={{
                marginTop: "1rem",
              }}
              variant="h6"
              gutterBottom
            >
              Education
            </Typography>

            {formData.educationSections.map((section, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{ padding: 2, marginTop: 2, position: "relative" }}
              >
                <Typography variant="h6">Education-{index + 1}</Typography>

                {formData.educationSections.length > 1 && (
                  <Button
                    onClick={() => handleRemoveEducationSection(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                )}

                <Stack spacing={2} marginTop={2}>
                  <FormControl fullWidth>
                    <InputLabel id={`degree-label-${index}`}>
                      Degree*
                    </InputLabel>

                    <Select
                      labelId={`degree-label-${index}`}
                      id={`degree-${index}`}
                      name="degree"
                      value={section.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      label="Degree*"
                    >
                      <MenuItem value="B.A.">B.A.</MenuItem>
                      <MenuItem value="B.A. LL.B.">B.A. LL.B.</MenuItem>
                      <MenuItem value="B.A.M.S.">B.A.M.S.</MenuItem>
                      <MenuItem value="B.Arch.">B.Arch.</MenuItem>
                      <MenuItem value="B.B.A.">B.B.A.</MenuItem>
                      <MenuItem value="B.B.A. LL.B.">B.B.A. LL.B.</MenuItem>
                      <MenuItem value="B.B.M.">B.B.M.</MenuItem>
                      <MenuItem value="B.C.A.">B.C.A.</MenuItem>
                      <MenuItem value="B.Com.">B.Com.</MenuItem>
                      <MenuItem value="B.Com. LL.B.">B.Com. LL.B.</MenuItem>
                      <MenuItem value="B.D.S.">B.D.S.</MenuItem>
                      <MenuItem value="B.Des.">B.Des.</MenuItem>
                      <MenuItem value="B.E. / B.Tech.">B.E. / B.Tech.</MenuItem>
                      <MenuItem value="B.Ed.">B.Ed.</MenuItem>
                      <MenuItem value="B.F.A.">B.F.A.</MenuItem>
                      <MenuItem value="B.H.M.S.">B.H.M.S.</MenuItem>
                      <MenuItem value="B.J.M.C.">B.J.M.C.</MenuItem>
                      <MenuItem value="B.M.S.">B.M.S.</MenuItem>
                      <MenuItem value="B.O.T.">B.O.T.</MenuItem>
                      <MenuItem value="B.P.T.">B.P.T.</MenuItem>
                      <MenuItem value="B.Pharm">B.Pharm</MenuItem>
                      <MenuItem value="B.Sc.">B.Sc.</MenuItem>
                      <MenuItem value="B.Sc. Ag.">B.Sc. Ag.</MenuItem>
                      <MenuItem value="B.Sc. IT">B.Sc. IT</MenuItem>
                      <MenuItem value="B.Sc. Nursing">B.Sc. Nursing</MenuItem>
                      <MenuItem value="B.S.W.">B.S.W.</MenuItem>
                      <MenuItem value="B.U.M.S.">B.U.M.S.</MenuItem>
                      <MenuItem value="B.V.Sc.">B.V.Sc.</MenuItem>
                      <MenuItem value="B.Voc.">B.Voc.</MenuItem>
                      <MenuItem value="C.A.">C.A.</MenuItem>
                      <MenuItem value="C.F.A.">C.F.A.</MenuItem>
                      <MenuItem value="C.M.A.">C.M.A.</MenuItem>
                      <MenuItem value="C.S.">C.S.</MenuItem>
                      <MenuItem value="D.Litt.">D.Litt.</MenuItem>
                      <MenuItem value="D.M.">D.M.</MenuItem>
                      <MenuItem value="D.Sc.">D.Sc.</MenuItem>
                      <MenuItem value="LL.M.">LL.M.</MenuItem>
                      <MenuItem value="M.A.">M.A.</MenuItem>
                      <MenuItem value="M.Arch.">M.Arch.</MenuItem>
                      <MenuItem value="M.B.A.">M.B.A.</MenuItem>
                      <MenuItem value="M.C.A.">M.C.A.</MenuItem>
                      <MenuItem value="M.Ch.">M.Ch.</MenuItem>
                      <MenuItem value="M.Com.">M.Com.</MenuItem>
                      <MenuItem value="M.Des.">M.Des.</MenuItem>
                      <MenuItem value="M.E. / M.Tech.">M.E. / M.Tech.</MenuItem>
                      <MenuItem value="M.Ed.">M.Ed.</MenuItem>
                      <MenuItem value="M.F.A.">M.F.A.</MenuItem>
                      <MenuItem value="M.H.M.">M.H.M.</MenuItem>
                      <MenuItem value="M.J.M.C.">M.J.M.C.</MenuItem>
                      <MenuItem value="M.M.S.">M.M.S.</MenuItem>
                      <MenuItem value="M.O.T.">M.O.T.</MenuItem>
                      <MenuItem value="M.P.H.">M.P.H.</MenuItem>
                      <MenuItem value="M.Pharm">M.Pharm</MenuItem>
                      <MenuItem value="M.P.T.">M.P.T.</MenuItem>
                      <MenuItem value="M.Sc.">M.Sc.</MenuItem>
                      <MenuItem value="M.Sc. Ag.">M.Sc. Ag.</MenuItem>
                      <MenuItem value="M.Sc. IT">M.Sc. IT</MenuItem>
                      <MenuItem value="M.Sc. Nursing">M.Sc. Nursing</MenuItem>
                      <MenuItem value="M.S.W.">M.S.W.</MenuItem>
                      <MenuItem value="M.V.Sc.">M.V.Sc.</MenuItem>
                      <MenuItem value="M.Voc.">M.Voc.</MenuItem>
                      <MenuItem value="Ph.D.">Ph.D.</MenuItem>
                    </Select>
                    {errors[`degree${index}`] && (
                      <Typography color="error" variant="caption">
                        {errors[`degree${index}`]}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Major*"
                    name="major"
                    value={section.major}
                    onChange={(e) => handleEducationChange(index, e)}
                    error={Boolean(errors[`major${index}`])}
                    helperText={errors[`major${index}`]}
                  />

                  <TextField
                    fullWidth
                    label="Minor"
                    name="minor"
                    value={section.minor}
                    onChange={(e) => handleEducationChange(index, e)}
                  />

                  <TextField
                    fullWidth
                    label="Institution*"
                    name="institution"
                    value={section.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    error={Boolean(errors[`institution${index}`])}
                    helperText={errors[`institution${index}`]}
                  />

                  <TextField
                    fullWidth
                    label="Year of Passing*"
                    name="yearOfPassing"
                    value={section.yearOfPassing}
                    onChange={(e) => handleEducationChange(index, e)}
                    error={Boolean(errors[`yearOfPassing${index}`])}
                    helperText={errors[`yearOfPassing${index}`]}
                  />
                </Stack>
              </Paper>
            ))}

            <Button
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
              variant="text"
              onClick={handleAddEducationSection}
            >
              Add More +
            </Button>

            <Typography
              sx={{
                marginTop: "1rem",
              }}
              variant="h6"
              gutterBottom
            >
              Experience
            </Typography>

            {formData.experienceSections.map((section, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{ padding: 2, marginTop: 2, position: "relative" }}
              >
                <Typography variant="h6">Experience-{index + 1}</Typography>

                {formData.experienceSections.length > 1 && (
                  <Button
                    onClick={() => handleRemoveExperienceSection(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                )}

                <Stack spacing={2} marginTop={2}>
                  <TextField
                    fullWidth
                    label="Company Name*"
                    name="companyName"
                    value={section.companyName}
                    onChange={(e) => handleExperienceChange(index, e)}
                    error={Boolean(errors[`companyName${index}`])}
                    helperText={errors[`companyName${index}`]}
                  />

                  <TextField
                    fullWidth
                    label="Designation*"
                    name="designation"
                    value={section.designation}
                    onChange={(e) => handleExperienceChange(index, e)}
                    error={Boolean(errors[`designation${index}`])}
                    helperText={errors[`designation${index}`]}
                  />

                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id={`fromMonth-label-${index}`}>
                        From Month*
                      </InputLabel>

                      <Select
                        labelId={`fromMonth-label-${index}`}
                        id={`fromMonth-${index}`}
                        name="fromMonth"
                        value={section.fromMonth}
                        onChange={(e) => handleExperienceChange(index, e)}
                        label="From Month*"
                        required
                      >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                        <MenuItem value="N/A">N/A</MenuItem>
                      </Select>
                      {errors[`fromMonth${index}`] && (
                        <Typography color="error" variant="caption">
                          {errors[`fromMonth${index}`]}
                        </Typography>
                      )}
                    </FormControl>

                    <TextField
                      fullWidth
                      label="From Year*"
                      name="fromYear"
                      value={section.fromYear}
                      onChange={(e) => handleExperienceChange(index, e)}
                      error={Boolean(errors[`fromYear${index}`])}
                      helperText={errors[`fromYear${index}`]}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id={`toMonth-label-${index}`}>
                        To Month*
                      </InputLabel>

                      <Select
                        labelId={`toMonth-label-${index}`}
                        id={`toMonth-${index}`}
                        name="toMonth"
                        value={section.toMonth}
                        onChange={(e) => handleExperienceChange(index, e)}
                        label="To Month*"
                        required
                        disabled={section.currentlyWorking}
                      >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                        <MenuItem value="N/A">N/A</MenuItem>
                      </Select>
                      {errors[`toMonth${index}`] && (
                        <Typography color="error" variant="caption">
                          {errors[`toMonth${index}`]}
                        </Typography>
                      )}
                    </FormControl>

                    <TextField
                      fullWidth
                      label="To Year*"
                      name="toYear"
                      value={section.toYear}
                      onChange={(e) => handleExperienceChange(index, e)}
                      error={Boolean(errors[`toYear${index}`])}
                      helperText={errors[`toYear${index}`]}
                      disabled={section.currentlyWorking}
                    />
                  </Stack>

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="currentlyWorking"
                        checked={section.currentlyWorking}
                        onChange={(e) => handleExperienceChange(index, e)}
                      />
                    }
                    label="I currently work here"
                  />
                </Stack>
              </Paper>
            ))}

            <Button
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
              variant="text"
              onClick={handleAddExperienceSection}
            >
              Add More +
            </Button>

            <Typography
              sx={{
                marginTop: "1rem",
              }}
              variant="h6"
              gutterBottom
            >
              Skills
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Skills (comma separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
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
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default UserDetails;
