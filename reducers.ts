import { CROSS_ROUTE, CIRCLE_ROUTE, SET_TURN, RESET_GAME } from './actionTypes'
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
        case RESET_GAME:
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

const reducers = combineReducers({
    common
})

export default reducers
