import React from "react";
import styled from "styled-components";
import { COLOURS } from "../constants";

const Message = styled.h3`
  text-align: center;
  color: ${COLOURS.DEFAULT};
  background-color: ${COLOURS.PRIMARY};
  padding: 20px 0;
  margin: 0 0 50px;
`;

const SurveySuccess = () => <Message>Survey completed. Thank you for your time!</Message>;

export default SurveySuccess;
