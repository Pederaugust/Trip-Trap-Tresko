import { CROSS_ROUTE, CIRCLE_ROUTE, SET_TURN, RESET_BOARD, PLAYER_2_SCORE, PLAYER_1_SCORE, RESET_SCORE, MATCH_FINISHED, MATCH_NOT_FINISHED } from './actionTypes'
import { combineReducers } from 'redux'

function markRoute(board: any, payload: any, xo: number) {
    return board.map((row: any, ri: number) => {
        return row.map((col: any, ci: number) => {
            if (ri !== payload.row || ci !== payload.column) {
                return col
            }
            return xo
        })
    })

}

function common(state = {
    board: [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]],
    turn: 1
}, action: any) {
    switch (action.type) {
        case CROSS_ROUTE:
            return {
                ...state, board:
                markRoute(state.board, action.payload, 1)
            }
        case CIRCLE_ROUTE:
            return {
                ...state, board:
                markRoute(state.board, action.payload, -1)
            }
        case SET_TURN:
            return {
                ...state, turn: action.payload.turn
            }
        case RESET_BOARD:
            let nextTurn = -1
            if (state.turn == 1){
                nextTurn = 1
            }
            return {
                ...state, board: [[0, 0, 0],
                                  [0, 0, 0],
                                  [0, 0, 0]], turn: nextTurn
            }
        default:
            return state
    }
}

function game(state = {
    player1Score: 0,
    player2Score: 0,
    finished: false
}, action: any){
    switch (action.type) {
        case PLAYER_1_SCORE:
            return {...state, player1Score: (state.player1Score + 1)}
        case PLAYER_2_SCORE:
            return {...state, player2Score: (state.player2Score + 1)}
        case RESET_SCORE:
            return {...state, player1Score: 0, player2Score: 0}
        case MATCH_FINISHED:
            return {...state, finished: true}
        case MATCH_NOT_FINISHED:
            return {...state, finished: false}
        default:
            return state
    }
}

const reducers = combineReducers({
    common,
    game
})

export default reducers
