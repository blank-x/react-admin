import UserManage from '../pages/user_manage/list';
import accessMap from '@/config/access.conf';
const routes: IRoutes[] = [
  {
    path: '/userManage',
    title:'用户管理',
    icon:'CodepenOutlined',
    children:[{
      title:'用户列表',
      exact: true,
      path:'/useManage/list',
      component: UserManage,
      access:accessMap.userManage
    }]
  },
];

export default routes;
