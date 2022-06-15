import React, { useEffect, useRef, useState } from 'react'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LoginForm } from '@/types/data'
import { login } from '@/store/actions/login'
import { InputRef } from 'antd-mobile/es/components/input'
import request from '@/utils/request'
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
  // 发送验证码的逻辑
  const [form] = Form.useForm()
  const mobileRef = useRef<InputRef>(null)
  
  // 验证码的倒计时
  const [codeCount, setCodeCount] = useState(0)
  const timer = useRef<number>(-1)
  // 组件渲染或销毁时清除定时器
  useEffect(() => {
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  // 如果倒计时等于0了清除定时器
  useEffect(() => {
    if(codeCount === 0) {
      clearInterval(timer.current)
    }
  }, [codeCount])
  const sendCode = async () => {
    if(codeCount > 0) {
      Toast.show('请' + codeCount + '秒后重新发送')
      return
    }
    const mobile = form.getFieldValue('mobile')
    const errors = form.getFieldError('mobile')
    
    if(!mobile || errors.length > 0) {
      Toast.show('请输入正确的手机号')
      return mobileRef.current?.focus()
    }
    // 发送验证码
    await request.get(`/sms/codes/${mobile}`) 
    setCodeCount(10)
    timer.current = window.setInterval(() => {
      console.log(codeCount);
      setCodeCount((codeCount) => {
        return codeCount - 1
      })
    }, 1000)
  }
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={handleFinish} form={form}>
          <Form.Item className="login-item" name={'mobile'} rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请填入正确的11位手机号' }
          ]}>
            <Input placeholder="请输入手机号" ref={mobileRef}></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={sendCode}>
                { codeCount > 0 ? `${codeCount}秒后重新发送` : '发送验证码'}
              </span>
            }
          >
            <Form.Item className="login-item" name={'code'} rules={[
              { required: true, message: '请输入验证码' },
              { pattern: /^\d{6}$/, message: '请输入正确的6位验证码' }
            ]}>
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button color='primary' block className='login-submit' type='submit' style={{width: 200}}></Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
