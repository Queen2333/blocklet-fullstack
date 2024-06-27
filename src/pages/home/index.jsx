import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Button, Form, Input, Card, Select, message } from 'antd';
import { get_userInfo, put_userInfo } from '../../libs/user';
const { Option } = Select;

const Home = () => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    countryCode: '86',
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 提交更改用户信息
  const onFinish = async (values) => {
    console.log(values, 'form value');
    try {
      setSubmitLoading(true);
      const res = await put_userInfo({ ...values, id: 1 });
      if (res) {
        message.success('保存成功');
        setSubmitLoading(false);
        setFormDisabled(true);
        getUserInfo();
      }
    } catch (err) {
      console.log('err', err);
      message.error('保存失败');
      setSubmitLoading(false);
    }
  };

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await get_userInfo({ id: 1 });
    form.setFieldsValue(res?.data);
  };

  return (
    <div className={styles.form_container}>
      <Card className={styles.form_style}>
        <div className={styles.form_content}>
          <Button className={styles.edit_btn} onClick={() => setFormDisabled(!formDisabled)}>
            {formDisabled ? '编辑' : '仅展示'}
          </Button>
          <Form
            layout="vertical"
            form={form}
            disabled={formDisabled}
            className={styles.form_content}
            initialValues={initialValues}
            onFinish={onFinish}>
            <Form.Item
              label="用户名"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
              ]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: '只能输入数字',
                },
              ]}>
              <Input
                placeholder="请输入手机号"
                addonBefore={
                  <Form.Item name="countryCode" noStyle>
                    <Select
                      style={{
                        width: 70,
                      }}>
                      <Option value="86">+86</Option>
                      <Option value="87">+1</Option>
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className={styles.submit_btn} htmlType="submit" loading={submitLoading}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default Home;
