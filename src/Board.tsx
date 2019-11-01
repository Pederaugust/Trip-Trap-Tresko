import { View, Text, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import Route from './Route'
import store from '../store'
import { reset, player2Score, player1Score, finished } from '../actions'
import { NO, O, X} from '../types'

interface IProps {
    board: any
}

function dispatchScores(winner: number) {
    switch (winner) {
        case X:
            store.dispatch(player1Score());
            return;
        case O:
            store.dispatch(player2Score());
            return;
    }
}

function checkVertical(board: any) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == NO) {
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
    return 0
}

function checkHorizontal(board: any) {
    for (let i = 0; i < 3; i++) {
        if (board[0][i] == NO) {
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
}

function checkBoardForWinner(board: any) {
    let result = checkVertical(board)

    if (result != 0) {
        return result
    }

    result = checkHorizontal(board)

    if (result != 0) {
        return result
    }

    return null
}

function boardFilled(board: any){
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] == NO){
                return false
            }
        }
    }
    return true
}


function Board(props: IProps) {
    if (boardFilled(props.board)){
        store.dispatch(finished())
    }


    let winner = checkBoardForWinner(props.board)

    if (winner == X || winner == O) {
        dispatchScores(winner)
        store.dispatch(finished())
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
        <View style={{
            flexDirection: 'row',
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
    )
}

export default connect(
    (state: any) => ({
        board: state.common.board
    })
)(Board)
