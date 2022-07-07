import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {Button, Form, Input, message, Spin} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import {connect} from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import {getUserInfo, login} from "@/store/actions";

const Login = (props) => {
    const {token, login, getUserInfo} = props;

    const [loading, setLoading] = useState(false);

    const handleLogin = (username, password) => {
        // 登录完成后 发送请求 调用接口获取用户信息
        setLoading(true);
        login(username, password)
            .then((data) => {
                message.success("登录成功");
                handleUserInfo(data.token);
            })
            .catch((error) => {
                setLoading(false);
                message.error(error);
            });
    };

    // 获取用户信息
    const handleUserInfo = (token) => {
        getUserInfo(token)
            .then((data) => {
            })
            .catch((error) => {
                message.error(error);
            });
    };

    const handleSubmit = (values) => {
        // 阻止事件的默认行为
        const {username, password} = values;
        handleLogin(username, password);
    };

    if (token) {
        return <Navigate to="/dashboard"/>
    }
    return (<DocumentTitle title={"用户登录"}>
        <div className="login-container">
            <Form onFinish={handleSubmit} className="content" initialValues={{
                username: 'admin', password: '123456'
            }}>
                <div className="title">
                    <h2>用户登录</h2>
                </div>
                <Spin spinning={loading} tip="登录中...">
                    <Form.Item name="username"
                               rules={[{
                                   required: true, whitespace: true, message: "请输入用户名",
                               }]}>
                        <Input
                            prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                            placeholder="用户名"
                        />
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[{
                                   required: true, whitespace: true, message: "请输入密码",
                               },]}>
                        <Input
                            prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <span>账号 : admin 密码 : 随便填</span>
                        <br/>
                        <span>账号 : editor 密码 : 随便填</span>
                        <br/>
                        <span>账号 : guest 密码 : 随便填</span>
                    </Form.Item>
                </Spin>
            </Form>
        </div>
    </DocumentTitle>);
};

export default connect((state) => state.user, {login, getUserInfo})(Login);
