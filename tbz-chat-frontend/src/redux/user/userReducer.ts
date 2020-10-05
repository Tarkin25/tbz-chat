import User from "../../models/User";
import { UserResponse } from "../../services/UserService";
import EntityMap from "../../util/EntityMap";
import EntityState, { createInitialState } from "../../util/EntityState";
import { AUTH_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";
import { RootAction } from "../rootReducer";

export type UserState = EntityState<User>

const initialState: UserState = createInitialState();

const populateFromUserResponse = (state: UserState, response: UserResponse): UserState => {

    let byId: EntityMap<User> = {};

    response.chats.forEach(chat => {
        chat.users.forEach(userResponse => {
            const user: User = {
                id: userResponse.id,
                email: userResponse.email,
                username: userResponse.username
            }

            byId[user.id] = user;
        })
    })

    return {
        ...state,
        byId,
        allIds: Object.keys(byId)
    }
}

const userReducer = (state: UserState | undefined = initialState, action: RootAction): UserState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return populateFromUserResponse(state, action.payload.response.data)
        default:
            return state;
    }
}

export default userReducer;