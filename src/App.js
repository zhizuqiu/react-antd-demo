import React, { useState } from 'react';
import { Button, Table, Space, Modal, Row, Col } from 'antd';
import './App.css';
import axios from 'axios'
import { Column } from '@ant-design/plots';

function App() {
  const [dataSource, setDataSource] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = () => {
    axios.get("testBoot/getAllUser")
      .then(function (rep) {
        console.log(rep.data)
        setDataSource(rep.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const addData = () => {
    axios.post("testBoot/addUser",
      {
        "userName": "1111111111111111",
        "passWord": "2111111111",
        "realName": "311111111111"
      }).then(function (rep) {
        console.log(rep.data)
        getData()
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const deleteData = (record) => {
    console.log(record)
    // /testBoot/deleteUser?id=1
    axios.delete("testBoot/deleteUser?id=" + record.id)
      .then(function (rep) {
        console.log(rep.data)
        getData()
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '密码',
      dataIndex: 'passWord',
      key: 'passWord',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteData(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    addData();
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };

  return (
    <div className="App">
      <Row gutter={50}>
        <Col span={12}>
          <Column {...config} />
        </Col>
        <Col span={12}>
          <Table dataSource={dataSource} columns={columns} />
          <Button type="primary" onClick={getData}>显示用户</Button>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>增加用户</Button>
        </Col>
      </Row>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default App;
