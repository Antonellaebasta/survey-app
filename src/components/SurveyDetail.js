import React, { Component } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import findIndex from "lodash/findIndex";
import { COLOURS, DESKTOP } from "../constants";
import { withRouter } from "react-router-dom";

const Title = styled.h3`
  text-align: center;
  color: ${COLOURS.DEFAULT};
  background-color: ${COLOURS.PRIMARY};
  padding: 20px 0;
  margin: 0 0 30px;
`;

const SubTitle = styled.p`
  color: ${COLOURS.PRIMARY};
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 30px;
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: stretch;
  align-items: center;
  margin: auto;
  width: 90%;
`;

const Question = styled.div`
  background-color: ${COLOURS.DEFAULT};
  color: ${COLOURS.PRIMARY};
  width: 100%;
  margin-bottom: 15px;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;

  h3 {
    color: ${COLOURS.SECONDARY};
  }

  @media ${DESKTOP} {
    margin-right: 15px;
    max-width: 45%;
  }
`;

const Options = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;

  li {
    margin: 10px;
  }

  @media ${DESKTOP} {
    width: 50%;
  }
`;

const SendSurvey = styled.button`
  outline: none;
  font-size: 18px;
  font-weight: bold;
  width: 80%;
  height: 47px;
  padding: 0;
  margin-bottom: 30px;
  border: 2px solid
    ${props => (props.disabled ? COLOURS.DEFAULT : COLOURS.SECONDARY)};
  color: ${props => (props.disabled ? COLOURS.PRIMARY : COLOURS.SECONDARY)};
  background-color: ${props =>
    props.disabled ? COLOURS.DEFAULT : "transparent"};
  box-shadow: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${COLOURS.PRIMARY};
    background-color: ${props =>
      props.disabled ? COLOURS.DEFAULT : COLOURS.SECONDARY};
  }

  @media ${DESKTOP} {
    width: 30%;
  }
`;

class SurveyDetail extends Component {
  state = { survey: {}, isLoading: true, answers: [] };

  /**
   * Fetch the surveys from API.
   * We should separate the business logic (Container) from component UI logic (Component) and Redux, for example, to handle
   * the Store and have one source of truth.
   * But for this simple example I fetch the data directly here in the Component.
   */
  getSurveyDetail = params => {
    fetch(
      `https://private-anon-2baa698c96-surveysmock.apiary-mock.com/api/surveys/${
        params.id
      }`
    )
      .then(response => response.json())
      .then(result =>
        this.setState({ survey: result.survey, isLoading: false })
      )
      .catch(error => console.error("Error:", error));
  };

  handleChange = event => {
    const { answers } = this.state;
    const optionSelected = event.target.value;
    const questionId = event.target.id.split("-")[0];
    const answerIndex = findIndex(answers, ["question_id", questionId]);

    if (answerIndex === -1)
      return this.setState({
        answers: [
          ...answers,
          { question_id: questionId, value: optionSelected }
        ]
      });

    answers[answerIndex] = { question_id: questionId, value: optionSelected };

    this.setState({ answers });
  };

  /**
   * Fetch to POST the survey.
   * About the UI: the SendSurvey button is disabled by default, only when the user complete all the questions
   * is able to click on the the button to save and send the data.
   */
  sendSurvey = () => {
    const { answers } = this.state;
    const {
      match: { params }
    } = this.props;
    const url = `https://private-anon-2baa698c96-surveysmock.apiary-mock.com/api/surveys/${
      params.id
    }/completions`;
    const data = { completion: answers };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => this.props.history.push('/success'))
      .catch(error => console.error("Error:", error));
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.getSurveyDetail(params);
  }

  render() {
    const {
      survey: { title, tagline, questions },
      isLoading,
      answers
    } = this.state;

    return (
      <React.Fragment>
        <Title>Survey in detail</Title>
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <SubTitle>
              {title}: {tagline}
            </SubTitle>
            <Questions>
              {questions &&
                questions.map(q => (
                  <Question key={q.id}>
                    <h3>{q.title}</h3>
                    <Options>
                      {q.options.map((option, index) => (
                        <li key={`${q.id}-${index}`}>
                          <input
                            type="radio"
                            id={`${q.id}-${index}`}
                            name={q.id}
                            value={option}
                            onChange={this.handleChange}
                          />
                          <label htmlFor={`${q.id}-${index}`}>{option}</label>
                        </li>
                      ))}
                    </Options>
                  </Question>
                ))}
              <SendSurvey
                onClick={this.sendSurvey}
                disabled={answers.length < questions.length}
              >
                Send survey
              </SendSurvey>
            </Questions>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(SurveyDetail);