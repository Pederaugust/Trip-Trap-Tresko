import { View, Text, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import Route from './Route'
import store from '../store'
import { reset } from '../actions'

const DeviceWidth = Dimensions.get('window').width

interface IProps {
    board: any
    current: number
}

function resetGame() {
    store.dispatch(reset())
}

function checkBoardForWinner(board: any) {

    for (let i = 0; i < 3; i++) {
        if (board[i][0] == 0) {
            continue
        }

        let current = board[i][0]

        for (let j = 1; j < 3; j++) {
            if (current != board[i][j]) {
                break
            }
            if (j == 2) {
                return current
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] == 0) {
            continue
        }

        let current = board[0][i]

        for (let j = 1; j < 3; j++) {
            if (current != board[j][i]) {
                break
            }
            if (j == 2) {
                return current
            }
        }
    }
    return null
}


function Board(props: IProps) {

    let winner = checkBoardForWinner(props.board)
    let winnerSymbol = null
    if (winner === 1) {
        winnerSymbol = 'X'
    } else if (winner === -1) {
        winnerSymbol = 'O'
    }

    const gameOver = winner != null

    const rows = props.board.map(
        (row: any, ri: number) => {
            return row.map(
                (col: any, ci: number) => {
                    return <Route val={col} row={ri} col={ci} gameOver={gameOver} />
                }
            )
        }
    )

    return (
        <React.Fragment>
            <View style={{ flex: 3, backgroundColor: 'red'}}>
                <Text>{winner ? `Winner: ${winnerSymbol}` : null} </Text>
                <Button title='Restart' onPress={resetGame} />
            </View>
            <View style={{
                flex: 6,
                backgroundColor: 'green',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View >
                        {rows[0][0]}
                        {rows[1][0]}
                        {rows[2][0]}
                    </View>
                    <View >
                        {rows[0][1]}
                        {rows[1][1]}
                        {rows[2][1]}
                    </View>
                    <View >
                        {rows[0][2]}
                        {rows[1][2]}
                        {rows[2][2]}
                    </View>
                </View>
            </View>
            <View style={{flex: 3, backgroundColor: 'blue'}}>
            </View>
        </React.Fragment>)
}

export default connect(
    (state: any) => ({
        board: state.common.board,
        current: state.common.current
    })
)(Board)
