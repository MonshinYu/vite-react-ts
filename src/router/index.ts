import App from "@/pages/App";
import React from "react";
import {HomeOutlined} from '@ant-design/icons';

interface Routes {
    title?: string;
    path?: string;
    element?: React.FC;
    to?: string;
    icon?: React.FC;

}

const routes: Routes[] = [
    {
        title: '首页',
        path: '/home',
        element: App,
        icon: HomeOutlined
    },
    {
        path: '/',
        to: '/home',
    }
];

export default routes;