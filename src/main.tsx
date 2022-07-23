import React, {useCallback} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import routes from "@/router";
import AppLayout from "@/layout";
import '@/main.less'
import 'antd/dist/antd.css';
import {connect, Provider} from "react-redux";
import {createStore} from 'redux';
import reduce from "@/reduce";

const Root = () => {
    interface actionType {
        type: string;
        data?: string;
    }

    const renderRoute = useCallback((routerConfig: any) => {
        return routerConfig.map((route: any, key: number) => {
            if (route.element) {

                const Component = (props: any) => {
                    if (props.route.title) document.title = props.route.title;
                    return <route.element {...props}/>
                };
                const ReduxComponent = connect(state => state || {}, (dispatch) => ({dispatch}))(Component);
                return (
                    <Route path={route.path} element={<ReduxComponent route={route}/>} key={key}>
                        {
                            route.children && renderRoute([...route.children])
                        }
                    </Route>
                )
            }
            if (route.to) {
                return (
                    <Route path={route.path} element={<Navigate to={route.to}/>} key={key}/>
                )
            }
        })
    }, []);
    const reduceStore: any = (state = {}, action: actionType) => {
        if (reduce[action.type]) return reduce[action.type](state, action.data);
        return state;
    };
    const store = createStore(reduceStore);
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppLayout>
                    <Routes>
                        {renderRoute(routes)}
                    </Routes>
                </AppLayout>
            </Provider>
        </BrowserRouter>
    )
}
ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
