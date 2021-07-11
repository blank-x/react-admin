import ProjectManage from '../pages/project_manage/list'
import accessMap from '@/config/access.conf';

const routes:IRoutes[] = [
  {
    path: '/projectManage',
    title:'项目管理',
    icon: 'DribbbleOutlined',
    children:[{
      path: '/projectManage/list',
      title:'项目列表',
      component: ProjectManage,
      exact: true,
      access:accessMap.projectManage,
    }]
  },
];

export default routes;
