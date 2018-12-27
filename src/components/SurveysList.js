import React, { Component } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { COLOURS, DESKTOP } from "../constants";

const Title = styled.h3`
  text-align: center;
  color: ${COLOURS.DEFAULT};
  background-color: ${COLOURS.PRIMARY};
  padding: 20px 0;
  margin: 0 0 50px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: stretch;
  align-items: center;
  margin: auto;
  width: 90%;

  @media ${DESKTOP} {
    flex-direction: row;
    width: 80%;
  }
`;

const ListItem = styled(Link)`
  background-color: ${COLOURS.DEFAULT};
  color: ${COLOURS.PRIMARY};
  width: 100%;
  margin-bottom: 15px;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLOURS.SECONDARY};
    transition: all 0.2s ease-in-out;
    h3 {
      color: ${COLOURS.DEFAULT};
    }
  }

  h3 {
    color: ${COLOURS.SECONDARY};
  }

  @media ${DESKTOP} {
    margin-right: 15px;
    max-width: 45%;
  }
`;

class SurveysList extends Component {
  state = { surveys: [], isLoading: true };

  /**
   * Fetch the surveys from API.
   * We should separate the business logic (Container) from component UI logic (Component) and Redux, for example, to handle
   * the Store and have one source of truth.
   * But for this simple example I fetch the data directly here in the Component.
   */
  getSurveys = () => {
    fetch(
      `https://private-anon-2baa698c96-surveysmock.apiary-mock.com/api/surveys`
    )
      .then(response => response.json())
      .then(result =>
        this.setState({ surveys: result.surveys, isLoading: false })
      )
      .catch(error => console.error("Error:", error));
  };

  componentDidMount() {
    this.getSurveys();
  }

  render() {
    const { surveys, isLoading } = this.state;

    return (
      <React.Fragment>
        <Title>Latest Surveys</Title>
        <ListWrapper>
          {isLoading && <Loader />}
          {surveys.map(data => (
            <ListItem key={data.id} to={`/survey/${data.id}`}>
              <h3>{data.title}</h3>
              <h5>{data.tagline}</h5>
            </ListItem>
          ))}
        </ListWrapper>
      </React.Fragment>
    );
  }
}

export default SurveysList;
