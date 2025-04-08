import { User } from "./authFormData";
import { Group } from "./Group";

export interface Message {
    id: string,
    sender: User,
    content: string,
    createdAt: string,
    group: Group
}

export interface sendMessageFormData {
    groupId: string,
    content: string
}