import * as types from '../actions/types'

const initialState = {
    isConnected: false,
    shouldConnect: false,
    address: null,
    chainError: false,
    investmentFactoryContract: null,
    investmentInfoRead: null
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
