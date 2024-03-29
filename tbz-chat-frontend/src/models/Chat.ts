import { Moment } from "moment";
import Entity from "./Entity";
import Role from "./Role";

export interface CreateChat {
    name: string,
    userIds: string[]
}

interface Chat extends Entity {
    name: string,
    role: Role,
    messageIds: string[],
    users: {
        [userId: string]: Role
    },
    createdAt: Moment;
}

export default Chat;