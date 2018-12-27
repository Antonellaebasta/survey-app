import React from "react";
import styled from "styled-components";
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import SurveysList from "./components/SurveysList";
import SurveyDetail from "./components/SurveyDetail";
import SurveySuccess from "./components/SurveySuccess";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <Wrapper>
    <Switch>
      <Route exact path='/' component={SurveysList}/>
      <Route path={`/survey/:id`} component={SurveyDetail} />
      <Route path={`/success`} component={SurveySuccess} />
    </Switch>
  </Wrapper>
);

export default App;
