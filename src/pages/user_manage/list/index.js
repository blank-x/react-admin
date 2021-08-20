import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import MainBreadcrumb from '@/layout/Breadcrumb';

function UserManage(props){
  return (
    <>
      <MainBreadcrumb list={[{ name: '项目管理' }, { name: props.route.title }]} />
      <div  style={{margin:"0 10px 0"}}>UserManage</div>
    </>
  )
}

export default UserManage;
