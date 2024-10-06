import myAxios from "../plugins/myAxios";
import { getCurrentUserState, setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    // 直接拿缓存，小系统建议不使用这种方式！
    // 小系统建议直接每次都获取后台一次就行，减少很多开发的麻烦！！
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
        // return currentUser;
    // }
    
    // 不存在，则从远程获取
    const res = await myAxios.get('/api/user/current');
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
};