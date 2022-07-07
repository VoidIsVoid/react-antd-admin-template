import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import DocumentTitle from "react-document-title";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Layout} from "antd";
import {getMenuItemInMenuListByProperty} from "@/utils";
import menuList from "@/config/menuConfig";
import {connect} from "react-redux";
import withRouter from "@/utils/router";
import routeList from "@/config/routeMap";

const {Content} = Layout;

const getPageTitle = (menuList, pathname) => {
    let title = "Ant Design Pro";
    let item = getMenuItemInMenuListByProperty(menuList, "path", pathname);
    if (item) {
        title = `${item.title} - Ant Design Pro`;
    }
    return title;
};

const LayoutContent = (props) => {
    const {role, location} = props;
    const {pathname} = location;
    const handleFilter = (route) => {
        // 过滤没有权限的页面
        return !route.roles || route.roles.includes(role);
    };
    return (
        <DocumentTitle title={getPageTitle(menuList, pathname)}>
            <Content style={{height: "calc(100% - 100px)", overflow: "auto"}}>
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname}
                        timeout={500}
                        classNames="fade"
                        exit={false}
                    >
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard"/>}/>
                            {routeList.filter(route => handleFilter(route)).map((route) => {
                                return (
                                    <Route
                                        element={<route.component/>}
                                        key={route.path}
                                        path={route.path}
                                    />
                                );
                            })}
                            <Route path='*' element={<Navigate to='/error/404'/>}/>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </Content>
        </DocumentTitle>
    );
};

export default connect((state) => state.user)(withRouter(LayoutContent));
