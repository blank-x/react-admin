import * as React from 'react';
import { Form, Input, Select } from 'antd';
import { EditableContext } from './index';

interface ICellProps {
  editing: boolean;
  editConfig?: any;
  dataIndex: number;
  title: string;
  record: any;
  index: number;
  children: any;
}

const EditableCell = (props: ICellProps) => {
  const getInput = () => {
    const editConfig = props.editConfig;
    if (!editConfig) {
      return (<Input />);
    }
    if (editConfig.type === 'select') {
      return (
        <Select>
          { editConfig.options.map((item: any) => (
            <Select.Option key = { item.value } value = { item.value }>
              { item.text }
            </Select.Option>
          )) }
        </Select>
      );
    }
    return (<Input />);
    // 此处省略若干其他类型，需要自行补充
  };

  const renderCell = (form: any) => {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      editConfig,
      children,
      ...restProps
    } = props;
    console.log(form);

    const rules = (editConfig && editConfig.rules) ? editConfig.rules : [];
    return (
      <td { ...restProps }>
        { editing ? (
          <Form.Item style = { { margin: 0 } }>
            { form.getFieldDecorator(dataIndex, {
              rules,
              initialValue: record[dataIndex],
            })(getInput()) }
          </Form.Item>
        ) : (
          children
        ) }
      </td>
    );
  };

  return <EditableContext.Consumer>{ renderCell }</EditableContext.Consumer>;
};

export default EditableCell;
