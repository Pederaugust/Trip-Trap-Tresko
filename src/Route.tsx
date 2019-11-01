import React from 'react'
import { View, Text, Dimensions, TouchableHighlight } from 'react-native'
import store from '../store'
import { crossRoute, circleRoute, setTurn } from '../actions'
import { connect } from 'react-redux'
import {X, O, NO} from '../types'

const DeviceWidth = Dimensions.get('window').width

interface IProps {
    val: number
    turn: number
    row: number
    col: number
    gameOver: boolean
}

function generateLetter(val: number) {
    switch (val) {
        case X:
            return 'X'
        case O:
            return 'O'
        default:
            return ' '
    }
}

function onPress(props: IProps) {
    return () => {
        if (props.val === NO && !props.gameOver) {
            switch (props.turn) {
                case X:
                    store.dispatch(crossRoute(props.row, props.col))
                    store.dispatch(setTurn(O))
                    break
                case O:
                    store.dispatch(circleRoute(props.row, props.col))
                    store.dispatch(setTurn(X))
                    break

            }
        }
    }
}

function Route(props: IProps) {

    let color = '#ffffff'
    if (props.val == X){
        color = '#009CB8'
    } else if (props.val == O){
        color = '#FF6347'
    }

    return (
        <View
            style={{ borderColor: 'black',
                     width: DeviceWidth * 0.26,
                     height: DeviceWidth * 0.26,
                     borderStyle: 'solid',
                     borderWidth: 4}}>
            <TouchableHighlight  style={{height: DeviceWidth * 0.26}} onPress={onPress(props)}>
                <Text style={{ color: color, fontSize: DeviceWidth * 0.18, textAlign: 'center' }}>{generateLetter(props.val)}</Text>
            </TouchableHighlight>
        </View>
    )
}

export default connect((state: any) => ({
    turn: state.common.turn
}))(Route)
