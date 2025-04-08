import { User } from "./authFormData";

export interface Group {
    id: string,
    name: string,
    users: User[]
}

export interface createGroupFormData {
    name: string
}

export interface groupFormData {
    groupId: string
}

export interface createGroupSessionFormData {
    groupId: string,
    description: string,
    from: string;
    to: string;
    date: string;
    venue?: string;
}

export interface GroupSession {
    id: string,
    description: string,
    from: string;
    to: string;
    date: string;
    venue?: string;
    group: Group,
    meetingLink: string
}