import Message from "../../models/Message";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { RootAction } from "../rootReducer";
import moment from 'moment';
import { POST_MESSAGE } from "./messageActionTypes";
import { MessageResponse } from "../../services/MessageService";

type MessageState = EntityState<Message>

const initialState: MessageState = createInitialState();

const pureMessage = (message: MessageResponse): Message => {
    return {
        id: message.id,
        authorId: message.author.id,
        body: message.body,
        timestamp: moment(message.timestamp)
    }
}

const populateFromUserResponse = (state: MessageState, response: UserResponse): MessageState => {

    let byId: EntityMap<Message> = {};

    response.chats.forEach(chat => {
        chat.messages.forEach(message => {
            byId[message.id] = pureMessage(message);
        })
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId)
    }
}

const postMessage = (state: MessageState, message: MessageResponse): MessageState => {
    let byId = {...state.byId};

    byId[message.id] = pureMessage(message);

    return {
        ...state,
        byId,
        allIds: Object.keys(byId)
    }
}

const messageReducer = (state: MessageState | undefined = initialState, action: RootAction): MessageState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        case POST_MESSAGE:
            return postMessage(state, action.payload.message);
        default:
            return state;
    }
}

export default messageReducer;