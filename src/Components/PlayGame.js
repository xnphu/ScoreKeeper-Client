import React, { Component } from 'react';
import { Container, Table, Button, Input } from 'reactstrap';

import './PlayGame.css'

class PlayGame extends Component {
    renderPlayers = (players) => {
        return players.map((player, index) => <th key={index}>{player}</th>)
    }

    renderSumScores = (scores) => {
        return (<tr>
            <th>Sum of Score (0)</th>
            {scores.map(scorePlayer => <th>
                    {scorePlayer.reduce((total, score) => total + parseInt(score), 0)}
                </th>)}
        </tr>);
    }

    renderScoresRow = (scores) => {
        const { updateScore } = this.props;

        return scores[0].map((score, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <Input  
                            value={scores[0][index]} 
                            onChange={(event) => {
                                updateScore(event.target.value, 0, index)
                            }} 
                            type="number"
                        />
                    </td>
                    <td>
                        <Input  
                            value={scores[1][index]} 
                            onChange={(event) => {
                                updateScore(event.target.value, 1, index)
                            }} 
                            type="number"
                        />
                    </td>
                    <td>
                        <Input  
                            value={scores[2][index]} 
                            onChange={(event) => {
                                updateScore(event.target.value, 2, index)
                            }} 
                            type="number"
                        />
                    </td>
                    <td>
                        <Input  
                            value={scores[3][index]} 
                            onChange={(event) => {
                                updateScore(event.target.value, 3, index)
                            }} 
                            type="number"
                        />
                    </td>
                </tr>
            )
        })
    }

    updateScore = (event) => {}

    render() {
        const { game, addNewRow } = this.props;
        const { players, scores } = game;

        return (
            <Container>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th></th>
                            {this.renderPlayers(players)}
                        </tr>
                        {this.renderSumScores(scores)}
                    </thead>
                    <tbody>
                        {this.renderScoresRow(scores)}
                    </tbody>
                </Table>
                <div className="text-center mb-3">
                    <Button onClick={addNewRow} color="danger" type="submit">
                        Add row
                    </Button>
                </div>
            </Container>
        );
    }
}

export default PlayGame;