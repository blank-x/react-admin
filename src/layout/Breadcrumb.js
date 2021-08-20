import { Breadcrumb } from 'antd';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
const {Item} = Breadcrumb
const MainBreadcrumb = function (props) {

  return (

    <BreadcrumbWrapper  separator=">">
      {props.list.map(({ name, link }) => (
        <Item key={name}>{link ? <NavLink to={link}>{name}</NavLink> : name}</Item>
      ))}
    </BreadcrumbWrapper>
  );
};

export default MainBreadcrumb;

const BreadcrumbWrapper = styled(Breadcrumb)`
  margin: 10px;
`
