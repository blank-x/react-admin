import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import MainBreadcrumb from '@/layout/Breadcrumb';
import {flattedRoutes} from 'src/routes'
import MainTable from './components/mainTable'
function ProjectManage(props){
  return (
    <>
      <MainBreadcrumb list={[{ name: '项目管理' }, { name: props.route.title }]} />
      <div  style={{margin:"0 10px 0"}}>ProjectManage</div>
      <MainTable></MainTable>
    </>
  )
}

export default ProjectManage;


