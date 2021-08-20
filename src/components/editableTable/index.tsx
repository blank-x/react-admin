import * as React from 'react';
import { Table, Button } from 'antd';
import EditableCell from './EditableCell';

interface ITableProps {
  form: any;
  columns: any;
  data: any;
  rowKey: string;
}

export const EditableContext = React.createContext({});
const { useState } = React;

const EditableTable = (props: ITableProps) => {
  const [tableData, setTableData] = useState(props.data);
  const [editingKey, setEditingKey] = useState<any>();

  const columns = props.columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any, index: number) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: index === editingKey,
        editConfig: col.editConfig,
      }),
    };
  });

  columns.push({
    title: 'operation',
    dataIndex: 'operation',
    render: (text: any, record: any, index: number) => {
      const editable = index === editingKey;
      return editable ? (
        <span>
          <Button onClick = { () => handleSaveEdit(record, index) }>Save</Button>
          <Button onClick = { handleCancelEdit }>Cancel</Button>
        </span>
      ) : (
        <Button onClick = { () => handleEdit(index) }>Edit</Button>
      );
    },
  });

  const handleEdit = (index: number) => {
    setEditingKey(index);
  };

  const handleSaveEdit = (record: any, index: number) => {
    props.form.validateFields().then((values: any) => {
      console.log(values);
      const newData = [...tableData];

      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...values,
      });

      setTableData(newData);
      setEditingKey(null);
    }).catch(()=>{

    });
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
  };

  const handleNewRow = () => {
    if (!!editingKey) {
      return;
    }
    const newData = [...tableData];
    const blankRow: any = {};

    props.columns.forEach((column: any) => {
      blankRow[column.dataIndex] = null;
    });

    newData.push(blankRow);

    setTableData(newData);
    setEditingKey(newData.length - 1);
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <EditableContext.Provider value = { props.form }>
      <Button onClick = { handleNewRow }>New</Button>
      <Table
        components = { components }
        bordered = { true }
        dataSource = { tableData }
        columns = { columns }
        pagination = { false }
        scroll={{ x: 1000, y: 600 }}
        rowKey = { props.rowKey }
      />
    </EditableContext.Provider>
  );
};

export default EditableTable;
