import * as types from './types'

export const triggerConnect = () => {
    return {
        type: types.TRIGGER_CONNECT
    }
}

export const setConnected = (payload) => {
    return {
        type: types.CONNECTED_SUCCESS,
        value: payload
    }
}

export const setDisconnected = () => {
    return {
        type: types.DISCONNECTED_SUCCESS
    }
}
