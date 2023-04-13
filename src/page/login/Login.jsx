import React from 'react'
import './Login.css'
import logo  from '../../assets/welcome2.png'
import {Button, Form, Input, message } from 'antd';
import { axiosLogin, saveToken } from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async(values) => {
    try {
      
      const{data} = await axiosLogin.post("/login",values)

      saveToken(data.accessToken)
      sessionStorage.setItem("isLogged", JSON.stringify(true)); 
      navigate("/users") 
      message.success("successfully logged")
      form.resetFields();
    }
    catch (error) {
      message.error("Error")
      form.resetFields();
    } 
    
  };
  return (
    <div className="main bodyofLo">
        <div className="login  text-center">
          <div className='flex justify-center pt-[40px]'>
            <img className='h-[90px]' src={logo} alt="" />
          </div>
        <Form
         name="normal_login"
         className="login-form" 
        initialValues={{
          remember: true,
        }}
        form = {form}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          className='pt-[50px]'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
                  <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button  htmlType="submit" className="login-form-button bg-[#FF9700] text-[white]">
          Log in
        </Button>
        </Form.Item>
      </Form>
        </div>
    </div>
  )
}

export default Login