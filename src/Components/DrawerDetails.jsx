import {
  Avatar,
  Box,
  Button,
  FormControl,
  NativeSelect,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const DrawerDetails = (props) => {
  console.log("props", props);
  const isPostApiSuccess = props?.isPostAPISuccess;
  console.log(isPostApiSuccess, "okok");
  const [responseDetail, setResponseDetails] = useState([]);

  const details = localStorage.getItem("Details");
  const userDetails = JSON.parse(details);
  console.log("userDetails", userDetails);

  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  const mailId = localStorage.getItem("Details");
  const userDetailsEmail = JSON.parse(mailId);
  console.log(mailId, "3333");
  const uid = userDetailsEmail.uid;
  console.log(uid, "444");

  useEffect(() => {
    const getResponse = fetch(
      `https://examtracker-37d6e-default-rtdb.firebaseio.com/${uid}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getResponse
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "okok");

        const updatedData = [];
        for (const key in data) {
          const latestdata = data[key];

          updateData(updatedData, latestdata);
        }
      });
  }, [isPostApiSuccess]);

  function updateData(updatedData, newEntry) {
    const subjectIndex = updatedData.findIndex(
      (item) => item.subject === newEntry.subject
    );

    if (subjectIndex !== -1) {
      const existingSubject = updatedData[subjectIndex];
      const topicIndex = existingSubject.topics.findIndex(
        (item) => item.topic === newEntry.topics[0].topic
      );

      if (topicIndex !== -1) {
        const existingTopic = existingSubject.topics[topicIndex];
        const subtopicIndex = existingTopic.subtopics.findIndex(
          (item) => item.name === newEntry.topics[0].subtopics[0].name
        );

        if (subtopicIndex !== -1) {
          if (
            newEntry.topics[0].subtopics[0].time !==
            existingTopic.subtopics[subtopicIndex].time
          ) {
            existingTopic.subtopics[subtopicIndex].time =
              newEntry.topics[0].subtopics[0].time;
          }
        } else {
          existingTopic.subtopics.push(newEntry.topics[0].subtopics[0]);
        }
      } else {
        existingSubject.topics.push(newEntry.topics[0]);
      }
    } else {
      updatedData.push(newEntry);
    }
    setResponseDetails(updatedData);
  }

  console.log(responseDetail, "okok");

  return (
    <>
      <Box className="bg-gray-200 px-6 m-5 rounded-lg">
        <Box className>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "medium",
              justifyContent: "space-around",
              paddingTop: "20px",
            }}
          >
            Track your preparations
          </Typography>

          <Box>
            <Box className="px-4 py-1">
              {" "}
              {userDetails.photo ? (
                <Avatar alt={userDetails.name} src={userDetails.photo} />
              ) : (
                <Avatar>
                  {userDetails.name ? userDetails.name.charAt(0) : ""}
                </Avatar>
              )}
            </Box>

            <Box className="px-4 py-1">
              <Typography>{userDetails.name}</Typography>
              <Typography>{userDetails.email}</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <FormControl>
              <NativeSelect
                defaultValue={""}
                inputProps={{
                  name: "subject",
                  id: "uncontrolled-native",
                }}
                onChange={handleSubjectChange}
                className="bg-zinc-500 rounded-sm px-2  mx-4"
              >
                <option value={""}>Select a subject</option>
                {responseDetail?.map((object, index) => (
                  <option key={index} value={object?.subject} color="blue">
                    {object?.subject}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>

          <Box className="p-10 h-0 m-4">
            {responseDetail
              ?.filter((object) => object?.subject === selectedSubject)
              .map((object, index) => (
                <Paper
                  key={index}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    color: "blue",
                    fontFamily: "Arial",
                    fontSize: "20px",
                    margin: "50px",
                    padding: "10px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "28px", fontWeight: "bold", color: "blue" }}
                  >
                    {object?.subject}
                  </Typography>

                  {object?.topics?.map((topic, index) => (
                    <Box key={index}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "medium",
                          color: "blue",
                        }}
                      >
                        {topic?.topic}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "thin",
                          color: "blue",
                          del: "center",
                        }}
                      >
                        {topic?.subtopics?.map((sub, index) => (
                          <span key={index}>
                            <li>
                              {sub.name} {` ${sub.time} min`}
                            </li>
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  ))}

                  <Button></Button>
                </Paper>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DrawerDetails;
