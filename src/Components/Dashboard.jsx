import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  IconButton,
  Drawer,
  Box,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { initialCourseData } from "../Constants/CourseData";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DrawerDetails from "./DrawerDetails";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [subTopicName, setSubTopicName] = useState("");
  const [subtopicDuration, setSubtopicDuration] = useState(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useState(false);

  const [isPostAPISuccess, setIsPostAPISuccess] = useState(false);

  const handleSubjectChange = (event, value) => {
    setSubjectName(value);
  };

  const handleTopicChange = (event, value) => {
    setTopicName(value);
  };
  const mailId = localStorage.getItem("Details");
  const userDetailsEmail = JSON.parse(mailId);
  const uid = userDetailsEmail.uid;

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    setSubjectName("");
    setTopicName("");
    setSubTopicName("");
    setSubtopicDuration("");

    setIsDrawerOpen(false);
    navigate("/dashboard");
    const postobject = {
      subject: subjectName,

      topics: [
        {
          topic: topicName,
          subtopics: [
            {
              name: subTopicName,
              time: subtopicDuration,
            },
          ],
        },
      ],
    };

    const res = await fetch(
      `https://examtracker-37d6e-default-rtdb.firebaseio.com/${uid}.json`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postobject),
      }
    );

    if (res.ok) {
      setIsPostAPISuccess(true);
      console.log(res, "postResponse");
      alert("Data Store");
    } else {
      alert("Kindly check");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="logo"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Typography>Add Subjects&nbsp;</Typography>
          <LibraryBooksIcon />
        </IconButton>

        <Button
          variant="contained"
          color="secondary"
          sx={{ height: "40px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <DrawerDetails isPostAPISuccess={isPostAPISuccess} />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="300px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Add your course subjects
          </Typography>
        </Box>
        <form onSubmit={handleSaveChanges}>
          <Stack spacing={2} padding={4}>
            <Stack direction="column" spacing={4}>
              <Autocomplete
                value={subjectName}
                onChange={handleSubjectChange}
                options={[
                  ...new Set([
                    ...initialCourseData.map((obj) => obj.subject),
                    "Add New Subject",
                  ]),
                ]}
                freeSolo
                onInputChange={handleSubjectChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subjects"
                    variant="filled"
                    size="small"
                    type="text"
                    color="secondary"
                    helperText="Free to add more subjects"
                  />
                )}
              />

              {subjectName !== "" && (
                <Autocomplete
                  value={topicName}
                  onChange={handleTopicChange}
                  options={[
                    ...new Set([
                      ...(initialCourseData
                        .find((obj) => obj.subject === subjectName)
                        ?.topics.map((topic) => topic.topic) || []),
                      "Add New Topic",
                    ]),
                  ]}
                  freeSolo
                  onInputChange={handleTopicChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Topics"
                      variant="filled"
                      size="small"
                      type="text"
                      color="secondary"
                      helperText="Free to add more topics"
                    />
                  )}
                />
              )}

              <Box className="flex flex-row gap-2">
                {topicName !== "" && (
                  <Autocomplete
                    value={subTopicName}
                    onChange={(event, newValue) => {
                      setSubTopicName(newValue);
                    }}
                    options={[
                      ...new Set(
                        initialCourseData
                          .find((obj) => obj.subject === subjectName)
                          ?.topics.find((topic) => topic.topic === topicName)
                          ?.subtopics.map((subtopic) => subtopic.name) || []
                      ),
                      "Add New Subtopic",
                    ]}
                    freeSolo
                    onInputChange={(event, newInputValue) => {
                      setSubTopicName(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub-topics"
                        variant="filled"
                        size="small"
                        type="text"
                        color="secondary"
                        helperText="Free to add more sub-topics"
                      />
                    )}
                  />
                )}
                {topicName !== "" && (
                  <Autocomplete
                    value={subtopicDuration}
                    onChange={(event, newValue) => {
                      setSubtopicDuration(newValue);
                    }}
                    options={
                      initialCourseData
                        .find((obj) => obj.subject === subjectName)
                        ?.topics.find((topic) => topic.topic === topicName)
                        ?.subtopics.map((subtopic) => subtopic.duration) || []
                    }
                    freeSolo
                    onInputChange={(event, newInputValue) => {
                      setSubtopicDuration(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Time"
                        variant="filled"
                        size="small"
                        type="number"
                        color="secondary"
                        helperText="Select Duration"
                      />
                    )}
                  />
                )}
              </Box>

              <Button type="submit" variant="contained" color="secondary">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};

export default Dashboard;
