import Index from '../pages/Index.vue';
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from '../pages/UserEdit.vue';
import SearchResult from '../pages/SearchResult.vue';
import UserLogin from '../pages/UserLogin.vue';
import TeamAddPage from '../pages/TeamAddPage.vue';
import TeamUpdatePage from '../pages/TeamUpdatePage.vue';
import UserUpdatePage from '../pages/UserUpdatePage.vue';
import UserTeamJoin from '../pages/UserTeamJoin.vue';
import UserTeamCreate from '../pages/UserTeamCreate.vue';

const routes = [
    {path: '/', component: Index },
    {path: '/team', title: '找队伍', component: Team },
    {path: '/user', title: '用户信息', component: User },
    {path: '/search', title: '找伙伴', component: Search},
    {path: '/user/edit', title: '编辑信息', component: UserEdit},
    {path: '/user/list', title: '用户列表', component: SearchResult},
    {path: '/user/login', title: '用户登录', component: UserLogin},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update',title: '更新队伍', component: TeamUpdatePage},
    {path: '/user/update', title: '更新用户', component: UserUpdatePage},
    {path: '/user/team/join', title: '加入的队伍', component: UserTeamJoin},
    {path: '/user/team/create', title: '创建的队伍', component: UserTeamCreate},
];

export default routes;
