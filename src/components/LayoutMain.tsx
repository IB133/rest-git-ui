import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Row, Col, Card} from 'antd';
import {GitTableResponse} from "./GitTableResponse.tsx";
import {GitForm} from "./GitForm.tsx";
import {RepositoryInfoTable} from "./RepositoryInfoTable.tsx";
import {RepositoryInfoForm} from "./RepositoryInfoForm.tsx";

const {Header, Sider, Content} = Layout;

export const LayoutMain: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isGet, setIsGet] = useState<boolean>(false)

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'AddRepos',
                            onClick: () => {
                                setIsGet(false);
                            }
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: 'GetRepos',
                            onClick: () => {
                                setIsGet(true);
                            }
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        width: '100%',
                    }}
                >
                    <Card>
                        {
                            (isGet) ?
                                (
                                    <>
                                        <Row style={{display: "flex", justifyContent: "center"}}>
                                            <RepositoryInfoForm/>
                                        </Row>
                                        <Row style={{display: "flex", justifyContent: "center"}}>
                                            <RepositoryInfoTable/>
                                        </Row>
                                    </>
                                )
                                :
                                (<Row>
                                    <Col span={12}><GitTableResponse/></Col>
                                    <Col span={12}><GitForm/></Col>
                                </Row>)
                        }
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};