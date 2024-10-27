import { UserType } from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description?: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    status: number;  // TODO 定义枚举值类型，更规范
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin: boolean;
    hasJoinNum: number;
};

