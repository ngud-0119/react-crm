import React from 'react';
import { Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined, CheckOutlined, LeftOutlined } from '@ant-design/icons';

const AddToolbar = (props) => {

  let { module } = props;

  return(
    <div className="toolbar">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/home" className="text-lightwhite">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/home/${module}`} className="text-lightwhite text-capitalize">{module}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link className="text-white fw-bold text-capitalize">Add {module}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="add-btns d-flex">
        <Link to={`/home/${module}`}><Button className="back-btn d-flex align-items-center mr-2"><LeftOutlined className="text-uppercase"/>Back To {module}</Button></Link>
        <Link to={`/home/${module}`}><Button className="btn-cancel mr-2 d-flex align-items-center"><CloseCircleOutlined />Cancel</Button></Link>
        <Link to={`/home/${module}`}><Button className="btn-save d-flex align-items-center" htmlType="submit"><CheckOutlined />Save</Button></Link>        
      </div>
    </div>
  )
}

export default AddToolbar