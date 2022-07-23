import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import React, {useCallback, useState} from 'react';
import './index.less';
import routes from "@/router";
import {useLocation, useNavigate} from "react-router-dom";

const {Header, Sider, Content} = Layout;

const AppLayout: (React.FC | any) = (props: any) => {
    const to = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const routerToNav = useCallback((routes: any) => routes.filter((route: any) => route.element).map((route: any) => {
        const IconMenu = route.icon;
        return {
            key: route.path,
            icon: IconMenu && <IconMenu/> || undefined,
            label: route.title,
            children: route.children ? routerToNav(routes.children) : undefined
        }
    }), []);
    const MenuClick = useCallback((item: any) => {
        to(item.key);
    }, []);
    const getBreadcrumb = (routes: any) => {
        let num = 0;
        const pos = location.pathname.split('/').filter(i => i !== '');
        const routesBreadcrumb: { title: any; path: any; }[] = [];
        const fun = (routes: any) => {
            const {
                title,
                path,
                children
            } = routes
                .filter((i: any) => i.element)
                .find((i: any) => i
                    .path
                    .split('/')
                    .filter((i: any) => i !== '')[0] === pos[num]) || {};
            if (title && path) {
                routesBreadcrumb.push({
                    title,
                    path
                })
            }
            if (children) fun(children);
        }
        fun(routes);
        return routesBreadcrumb;
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    onClick={MenuClick}
                    items={routerToNav(routes)}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Breadcrumb
                    style={{
                        marginTop: 12,
                        marginLeft: 24,
                    }}
                >
                    {
                        getBreadcrumb(routes).map((item, key, array) => {
                            if (array.length - 1 === key) {
                                return (
                                    <Breadcrumb.Item key={key}>{item.title}</Breadcrumb.Item>
                                )
                            }
                            return (
                                <Breadcrumb.Item key={key}>
                                    <a href={item.path}>{item.title}</a>
                                </Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;