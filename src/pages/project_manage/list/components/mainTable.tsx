import React from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import EditableTable from '@/components/editableTable';
interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default ()=>{
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },

  ];
  return (
    <Form form={form}>
      <EditableTable form={form} columns={columns} data={originData} rowKey={'address'} />
  </Form>
  )
}
