import Home from '../pages/home';
import project_manage from './project_manage';
import user_manage from './user_manage';
import accessMap from 'src/config/access.conf'

const routes:IRoutes[] = [
  {
    path: '/',
    component: Home,
    icon: 'HomeOutlined',
    exact: true,
    title:'首页',
    access:accessMap.home,
  },
  ...project_manage,
  ...user_manage,
];




export default routes;



export const flattedRoutes = flatRoutes(routes);

export function filterAccessRoutes(routes:IRoutes[],access:number[]){
  function filterCb(routes:IRoutes[]){
    return routes.map(item=>({...item})).filter((item)=>{
      if(!item.children){
        return access.includes(item.access)
      }else{
        item.children = filterCb(item.children)
        return item.children.length>0
      }
    })
  }

  return filterCb(routes)

}

function flatRoutes(routes:IRoutes[]){
  let temp:IRoutes[] = []

  function get(routes:IRoutes[]){
    routes.forEach(item=>{
      if(item.children){
        get(item.children)
      }else{
        temp.push(item)
      }
    })
  }
  get(routes)

  return temp
}
