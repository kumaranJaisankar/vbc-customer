import { sidePaneUIStatus } from "./constants";

const initialState = {
    showRenewPane : false,
    showUpgradePane : false,
    showChangePane:false,
    showInvoicePane : false,
    allOrPartialPlans : "partial"
}

export default (state=initialState, action) => {
    switch(action.type){
        case sidePaneUIStatus.showRenewPane: {
            return {
                ...state,
                ...action.payload
            }
        }
        case sidePaneUIStatus.showUpgradePane: {
            return {
                ...state,
                ...action.payload
            }
        }
        case sidePaneUIStatus.showChangePane: {
            return {
                ...state,
                ...action.payload
            }
        }
        case sidePaneUIStatus.showInvoicePane: {
            return {
                ...state,
                ...action.payload
            }
        }
        case sidePaneUIStatus.setAllOrPartialPlansFetch: {
            return {
                ...state,
                allOrPartialPlans: action.payload
            }
        }
        default : {
            return state
        }
    }
}