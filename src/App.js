import React, { Component } from 'react';
import { Container } from 'reactstrap'

import logo from './logo.svg';
import './App.css';
import Message from './Message';
import Button from './Button';
import NewGame from './Components/NewGame'
import Header from './Components/Header'

import axios from 'axios';
import { ROOT_API } from './statics';
import PlayGame from './Components/PlayGame';
import Loading from './Components/Loading';


class App extends Component {
  state = {
    showImg: true,
    message: "Hello world",
    num: 0,
    game: null,
    loading: true
  }

  componentDidMount() {
    if (window.location.pathname) {
      const pathParams = window.location.pathname.slice(1).split("/");
      console.log(pathParams);
      if (pathParams[1] && pathParams[0] === "game") {
        const questionId = pathParams[1];

        axios({
          url: `${ROOT_API}/api/game/${questionId}`,
          method: "GET"
        }).then(response => {
          console.log(response.data)
          if (response.data.success) {
            setTimeout(() => {
              this.setState({ game: response.data.game, loading: false })
            }, 2000);
          }
        }).catch(error => {
          this.setState({ game: null, loading: false })
          console.log(error)
        })
      } else {
        this.setState({ loading: false, game: null })
      }
    }
  }

  addNewRow = () => {
    const { game } = this.state;
    game.scores = game.scores.map(score => [...score, 0]);
    this.setState({ loading: true });

    axios({
      method: "PUT",
      url: `${ROOT_API}/api/game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      console.log(response.data)
      this.setState({ loading: false, game })
    }).catch(err => {
      console.log(err)
      this.setState({ loading: false });
    });

    this.setState({ game });
  }

  updateScore = (score, playerIndex, rowIndex) => {
    const { game } = this.state;
    game.scores[playerIndex][rowIndex] = score;

    axios({
      method: "PUT",
      url: `${ROOT_API}/api/game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      console.log(response.data)
      this.setState({ game })
    }).catch(err => {
      console.log(err)
    });

    this.setState({ game });
  }

  render() {
    const { game, loading } = this.state;
    

    return (
      <Container className="App">
        <Header />
        {loading ? <div className="text-center">
          <Loading />
        </div> : (game ? 
        <PlayGame 
          game={game} 
          addNewRow={this.addNewRow}
          updateScore={this.updateScore}
          /> 
          : <NewGame toggleLoading={(loading) => { this.setState({ loading }) }} />)}
      </Container>
    );
  }
}

export default App;
