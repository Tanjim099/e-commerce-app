import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function ({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [

        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Dashboard',
            link: "dashboard"
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Orders',
            link: "orders"
        },

    ]
    return (
        <Layout className='h-100' style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible className='overflow-y-scroll sideBar' collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                >
                    {
                        menuItems && menuItems.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                {
                                    <Link to={`/admin/${item.link}`}>{item.label}</Link>
                                }
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    className='overflow-y-scroll content'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
