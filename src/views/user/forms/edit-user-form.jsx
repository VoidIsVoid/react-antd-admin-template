import React, {Component} from "react";
import {Form, Input, Modal, Select} from "antd";

const {TextArea} = Input;

class EditUserForm extends Component {
    render() {
        const {
            visible,
            onCancel,
            onOk,
            confirmLoading,
            currentRowData,
        } = this.props;
        const {id, name, role, description} = currentRowData;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4},
            },
            wrapperCol: {
                sm: {span: 16},
            },
            initialValues: {
                id,
                name,
                role,
                description
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
                    <Form.Item label="用户ID:" name="id">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="用户名称:" name="name" rules={[{required: true, message: "请输入用户名称!"}]}>
                        <Input placeholder="请输入用户名称"/>
                    </Form.Item>
                    <Form.Item label="用户角色:" name="role">
                        <Select style={{width: 120}} disabled={id === "admin"}>
                            <Select.Option value="admin">admin</Select.Option>
                            <Select.Option value="editor">editor</Select.Option>
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

export default EditUserForm;
