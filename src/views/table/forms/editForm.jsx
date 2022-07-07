import React, {Component} from "react";
import {DatePicker, Form, Input, Modal, Rate, Select} from "antd";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

class EditForm extends Component {
    render() {
        const {
            visible,
            onCancel,
            onOk,
            confirmLoading,
            currentRowData,
        } = this.props;
        const {id, author, date, readings, star, status, title} = currentRowData;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4},
            },
            wrapperCol: {
                sm: {span: 16},
            },
            initialValues: {
                id,
                title,
                author,
                readings,
                star: star.length,
                status,
                date: moment(date || "YYYY-MM-DD HH:mm:ss"),
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
                    <Form.Item label="序号:" name="id">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="标题:" name="title" rules={[{required: true, message: "请输入标题!"}]}>
                        <Input placeholder="标题"/>
                    </Form.Item>
                    <Form.Item label="作者:" name="author">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="阅读量:" name="readings">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="推荐指数:" name="star">
                        <Rate count={3}/>
                    </Form.Item>
                    <Form.Item label="状态:" name="status">
                        <Select style={{width: 120}}>
                            <Select.Option value="published">published</Select.Option>
                            <Select.Option value="draft">draft</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="时间:" name="date" rules={[{type: 'object', required: true, message: '请选择时间!'}]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default EditForm;
