import { SessionHistory } from "./constants";

export const setSessionHistoryTableData = (payload) => {
    return {
        type: SessionHistory.setSessionHistory,
        payload
    }
}