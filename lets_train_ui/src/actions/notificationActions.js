import {SET_NOTIFICATION, RESET_NOTIFICATION} from '../constants/frontEndConstants';

export function setNotification(data){
	return {
		type: SET_NOTIFICATION,
		data: data
	}
}

export function resetNotification(){
	return {
		type: RESET_NOTIFICATION
	}
}