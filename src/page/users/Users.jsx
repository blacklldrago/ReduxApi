
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUsers, deleteUsers, editUsers, getUsers } from '../../reducers/users';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fileToBase64 } from '../../utils/fileToBase64';
import { DatePicker, Space , Image} from 'antd';
const Users = () => {
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [present, setPresent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [present1, setPresent1] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [Id, setId] = useState(null)
  const onFinish = async(e) => {
 
    e.avatar = present;
    let date = new Date(e["birthday"].toString());
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let ans = [date.getFullYear(), mnth, day].join("-");
    e["birthday"] = ans;
    dispatch(addUsers(e));
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleFile = async (e) => {
    let file = await fileToBase64(e.target.files[0]);
    setPresent(file)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleFormat = (lol) => {
    let date = new Date(lol.toString());
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let ans = [date.getFullYear(), mnth, day].join("-");
    return ans;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
    form1.resetFields();
  };
  const showModal1 = (id) => {
    setIsModalOpen1(true);
    setId(id);
  };
  const onFinish1 = async(e) => {
    
    e.avatar = present1;
    let date = new Date(e["birthday"].toString());
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let ans = [date.getFullYear(), mnth, day].join("-");
    e["birthday"] = ans;
    let joke = {
      ...e,
      id:Id
    };
    dispatch(editUsers(joke));
    // console.log(Id);
    form1.resetFields();
    setIsModalOpen1(false);
    // console.log("Success:", e);
  };
  const handleFile1 = async (e) => {
    let file1 = await fileToBase64(e.target.files[0]);
    setPresent1(file1)
  };
  const onFinishFailed1 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
    form1.resetFields();
    
  };
  const users = useSelector((state)=>state.users.users)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'AVATAR',
      dataIndex: 'avatar',
      key: 'avatar',
      render:(e,row)=>{
        return (
          <img className='h-[40px] w-[40px] rounded-[100%]' src={row.avatar} alt="" />
        )
      }
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render:(e,row)=>{
        return (
          <h1>{row.name}</h1>
        )
      }
    },
    {
      title: 'SURNAME',
      dataIndex: 'surname',
      key: 'surname',
      render:(e,row)=>{
        return (
          <h1>{row.surname}</h1>
        )
      }
    },
    {
      title: 'BIRTHDAY',
      dataIndex: 'birthday',
      key: 'birthday',
      render:(e,row)=>{
        return (
          <h1>{row.birthday}</h1>
        )
      }
    },
    {
      title: 'Married',
      dataIndex: 'isMarried',
      key: 'isMarried',
      render:(e,row)=>{
        return (
          <h1>{row.isMarried}</h1>
        )
      }
    },
    {
      title: 'Buttons',
      dataIndex: 'buttons',
      key: 'buttons',
      render:(e, row)=>{
        return(<div className='flex'>
            <div>

            <Button className='bg-[#e33e3e] text-[16px] h-[40px] mr-[20px] ' onClick={()=>dispatch(deleteUsers(row.id))}>Delete<DeleteIcon/></Button>
            </div>
            <div>
            <Button className='bg-[yellow] text-[16px] h-[40px]' onClick={()=>{showModal1(row.id)
            
            form1.setFieldValue("name", row.name)
            form1.setFieldValue("surname", row.surname)
            // form1.setFieldValue("birthday", handleFormat(row.birthday))
            form1.setFieldValue("isMarried", row.isMarried)
            }}>Edit<EditIcon/></Button>
                
            </div>
                
        </div>)
      }
    },
  ];
  


  return (
    <div>
      <div className='text-center pt-[100px]'>
        <Button className='bg-[#2DB84B] w-[140px] text-[20px] h-[50px] mb-[60px]' onClick={()=>showModal()}>Add User&nbsp;<AddTaskIcon /></Button>
      </div>
      
      <Table pagination = {false} className='w-[1200px] m-auto' dataSource={users} columns={columns} />;
      {
        isModalOpen &&(<>      
      <Modal title="New User" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel} footer = {false}>
      <Form 
        className="text-left "
        name="basic"
        labelCol={{
            span: 8,
          }}
          form={form}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
      <Row gutter={[10, 0]}>
        <Col span={20}>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: 'Please put Avatar!',
              },
            ]}
          >
          <input onChange={handleFile} type="file" name="avatar" />

          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
          <Input />

          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: 'Please input your Surname!',
              },
            ]}
          >
          <Input/>
          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Please input your Birthday!',
              },
            ]}
          >
           <DatePicker />
  
          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Are You Married?"
            name="isMarried"
            rules={[
              {
                required: true,
                message: 'Please input Single or Married!',
              },
            ]}
          >
          <Input/>
          </Form.Item>
        </Col>
        <Col  span={24}>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{background: ""}}  htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
      </Form>
        </Modal></>)
      } 
      {
        isModalOpen1 &&(<>      
      <Modal title="Edit Users" open={isModalOpen1} onOk={handleOk1}  onCancel={handleCancel1} footer = {false}>
      <Form 
        className="text-left "
        name="basic"
        labelCol={{
            span: 8,
          }}
          form={form1}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed1}
          autoComplete="off"
        >
      <Row gutter={[10, 0]}>
        <Col span={20}>
          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: 'Please put Avatar!',
              },
            ]}
          >
          <input onChange={handleFile1} type="file" name="avatar" />

          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
          <Input />

          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: 'Please input your Surname!',
              },
            ]}
          >
          <Input/>
          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Please input your Birthday!',
              },
            ]}
          >
           <DatePicker />
  
          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Maried"
            name="isMarried"
            rules={[
              {
                required: true,
                message: 'Please input your state!',
              },
            ]}
          >
          <Input/>
          </Form.Item>
        </Col>
        <Col  span={24}>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{background: ""}}  htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
      </Form>
        </Modal></>)
      }
    </div>
  )
}

export default Users