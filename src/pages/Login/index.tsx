import React from 'react'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LoginForm } from '@/types/data'
import { login } from '@/store/actions/login'
export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleFinish = async (values: LoginForm) => {
    await dispatch<any>(login(values))
    Toast.show({
      icon: 'success',
      content: '登录成功'
    })
    history.push('/')
  }
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={handleFinish}>
          <Form.Item className="login-item" name={'mobile'} rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请填入正确的11位手机号' }
          ]}>
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Form.Item className="login-item" name={'code'} rules={[
              { required: true, message: '请输入验证码' },
              { pattern: /^\d{6}$/, message: '请输入正确的6位验证码' }
            ]}>
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button color='primary' block className='login-submit' type='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
