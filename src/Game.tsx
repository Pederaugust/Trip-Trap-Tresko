import { View, Text, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import React from 'react'
import store from '../store'
import { reset, resetGame, notFinished } from '../actions'
import Board from './Board'
import { X, O } from '../types'

const DeviceWidth = Dimensions.get('window').width

function resetBoard() {
    store.dispatch(reset())
    store.dispatch(notFinished())
}

function resetScore() {
    resetBoard()
    store.dispatch(resetGame())
}


interface IProps {
    current: number
    finished: boolean
    player1Score: number
    player2Score: number
}

function Game(props: IProps) {
    return (
        <React.Fragment>
            <View style={{ flex: 3,flexDirection: 'column', justifyContent: 'flex-end'}}>
                <View style={{ transform: [{ rotate: '180deg' }]}}>
                <Text style={{ fontSize: 30 }}>
                    Score: {props.player2Score}
                </Text>
                </View>
                <View style={{flexDirection: 'row', transform: [{ rotate: '180deg' }],
                alignContent: 'space-between'} }>
                <Text style={{fontSize: 40 }}>
                    O
                </Text>
                {
                    props.current == O ?
                <Text style={{fontSize: 30}}>
                    Your Turn
                </Text>
                    : null
                }
                </View>
            </View>
            <View style={{
                flex: 6,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Board />
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ flex: 8, flexDirection: 'column' }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 40 }}> X</Text>
                        {
                            props.current == X ?
                            <Text style={{ fontSize: 30 }}> Your Turn </Text>
                            : null
                        }
                    </View>
                    <Text style={{ fontSize: 30 }}> Score: {props.player1Score}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 4, height: 50 }}>
                    {props.finished ? <Button title='New Match' onPress={resetBoard} /> : null}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Button title='New Game' onPress={resetScore} />
            </View>
        </React.Fragment>
    )
}

export default connect(
    (state: any) => ({
        current: state.common.turn,
        finished: state.game.finished,
        player1Score: state.game.player1Score,
        player2Score: state.game.player2Score
    })
)(Game)
