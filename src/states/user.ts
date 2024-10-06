import { UserType } from "../models/user";

let currentUser: UserType;  // 全局变量，存储当前用户值!!

const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

const getCurrentUserState = () : UserType => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}