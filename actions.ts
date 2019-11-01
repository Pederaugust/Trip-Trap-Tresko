import { CROSS_ROUTE, CIRCLE_ROUTE, SET_TURN, PLAYER_2_SCORE, PLAYER_1_SCORE, RESET_BOARD, RESET_SCORE, MATCH_NOT_FINISHED, MATCH_FINISHED } from './actionTypes'

export function crossRoute(row: number, column: number) {
    return {
        type: CROSS_ROUTE,
        payload: {
            row,
            column
        }
    }
}

export function circleRoute(row: number, column: number) {
    return {
        type: CIRCLE_ROUTE,
        payload: {
            row,
            column
        }
    }
}

export function setTurn(turn: number) {
    return {
        type: SET_TURN,
        payload: {
            turn
        }
    }
}

export function reset() {
    return {
        type: RESET_BOARD
    }
}


export function player1Score() {
    return {
        type: PLAYER_1_SCORE
    }
}

export function player2Score() {
    return {
        type: PLAYER_2_SCORE
    }
}

export function resetGame() {
    return {
        type: RESET_SCORE
    }
}

export function notFinished() {
    return {
        type: MATCH_NOT_FINISHED
    }
}

export function finished(){
    return {
        type: MATCH_FINISHED
    }
}
