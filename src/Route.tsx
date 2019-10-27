import React from 'react'
import { View, Text, Dimensions, TouchableHighlight } from 'react-native'
import store from '../store'
import { crossRoute, circleRoute, setTurn } from '../actions'
import { connect } from 'react-redux'

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
        case 1:
            return 'X'
        case -1:
            return 'O'
        default:
            return ' '
    }
}

function onPress(props: IProps) {
    return () => {
        console.log(props.gameOver)
        if (props.val === 0 && !props.gameOver) {
            switch (props.turn) {
                case 1:
                    store.dispatch(crossRoute(props.row, props.col))
                    store.dispatch(setTurn(-1))
                    break
                case -1:
                    store.dispatch(circleRoute(props.row, props.col))
                    store.dispatch(setTurn(1))
                    break

            }
        }
    }
}

function Route(props: IProps) {

    return (
        <View
            style={{ borderColor: 'black',backgroundColor:'blue', width: DeviceWidth * 0.28, height: DeviceWidth * 0.28, borderStyle: 'solid', borderWidth: 2 }}>
            <TouchableHighlight onPress={onPress(props)}>
                <Text style={{ fontSize: 40, textAlign: 'center' }}>{generateLetter(props.val)}</Text>
            </TouchableHighlight>
        </View>
    )
}

export default connect((state: any) => ({
    turn: state.common.turn
}))(Route)
