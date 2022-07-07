import React, {Component} from "react";
import {Form, Input, Modal, Select} from "antd";
import {reqValidatUserID} from "@/api/user";

const {TextArea} = Input;

class AddUserForm extends Component {
    validateUserID = async (rule, value, callback) => {
        if (value) {
            if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
                callback("用户ID必须为1-6位数字或字母组合");
            }
            let res = await reqValidatUserID(value);
            const {status} = res.data;
            if (status) {
                callback("该用户ID已存在");
            }
        } else {
            callback("请输入用户ID");
        }
        callback();
    };

    render() {
        const {visible, onCancel, onOk, confirmLoading} = this.props;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4},
            },
            wrapperCol: {
                sm: {span: 16},
            },
            initialValues: {
                role: 'admin'
            }
        };
        return (
            <Modal
                title="编辑"
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="用户ID:" name="id" rules={[{required: true, validator: this.validateUserID}]}>
                        <Input placeholder="请输入用户ID"/>
                    </Form.Item>
                    <Form.Item label="用户名称:" name="name" rules={[{required: true, message: "请输入用户名称!"}]}>
                        <Input placeholder="请输入用户名称"/>
                    </Form.Item>
                    <Form.Item label="用户角色:" name="role">
                        <Select style={{width: 120}}>
                            <Select.Option value="admin">admin</Select.Option>
                            <Select.Option value="guest">guest</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="用户描述:" name="description">
                        <TextArea rows={4} placeholder="请输入用户描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default AddUserForm;
