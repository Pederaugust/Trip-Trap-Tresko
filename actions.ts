import { CROSS_ROUTE, CIRCLE_ROUTE, SET_TURN, RESET_GAME} from './actionTypes'

export function crossRoute(row: number, column:number){
    return {
        type: CROSS_ROUTE,
        payload: {
            row,
            column
        }
    }
}

export function circleRoute(row:number, column:number){
   return {
       type: CIRCLE_ROUTE,
       payload: {
           row,
           column
       }
    }
}

export function setTurn(turn:number){
    return {
        type: SET_TURN,
        payload: {
            turn
        }
    }
}

export function reset(){
    return {
        type: RESET_GAME
    }
}
