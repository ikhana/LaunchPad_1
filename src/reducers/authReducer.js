import * as types from '../actions/types'

const initialState = {
    isConnected: false,
    shouldConnect: false,
    user: null,
    address: null,
    chainError: false,
    launchPadContract: null,
    investmentInfoRead: null,
    signer: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.TRIGGER_CONNECT:
            return {
                ...state,
                shouldConnect: true
            }
        case types.CONNECTED_SUCCESS:
            return {
                ...state,
                ...action.value,
                shouldConnect: false,
                address: action.value.address
            }
        case types.DISCONNECTED_SUCCESS:
            return {
                ...initialState
            }

        default:
            return state
    }
}
