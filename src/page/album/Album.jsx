import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addAlbum, deleteAlbum, editAlbum, getAlbum } from '../../reducers/album'
import { useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button, Col, Form, Input, Menu, Modal, Row, Select } from 'antd';
import { fileToBase64 } from '../../utils/fileToBase64';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card} from 'antd';
const { Meta } = Card;
const Album = () => {
  const [form] = Form.useForm()
  const [present, setPresent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [present1, setPresent1] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [Id, setId] = useState(null)
  const showModal1 = (id) => {
    setIsModalOpen1(true);
    setId(id);
  };
  const onFinish1 = async(e) => {
    
    e.img = present1;
    let joke = {
      ...e,
      id:Id
    }
    dispatch(editAlbum(joke));
    // console.log(Id);
    form.resetFields();
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
    form.resetFields();
    
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const onFinish = async(e) => {
 
    e.img = present;
    // console.log("Success:", e);
    dispatch(addAlbum(e));
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
  const album = useSelector(state=>state.album.album)
  const dispatch = useDispatch();
  // console.log(album);
  useEffect(()=>{
    dispatch(getAlbum());
  },[dispatch])
  return (
    <div>
      <h1 className='text-center text-[50px] pt-[40px] pb-[40px] font-[700] text-[white]'>ALBUMN</h1>
      <div className='inputs text-center'>
        <Button className='bg-[#2DB84B] w-[155px] text-[20px] h-[50px] mb-[60px]' onClick={()=>showModal()}>Add Album&nbsp;<AddTaskIcon /></Button>
      </div>
      {
        album.map((e)=>{
          return(
            <Card sx={{ maxWidth: 345, display:"inline-block",  marginLeft:"20px",  marginTop:"20px"}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140px"
                  image={e.img}
                  className= "h-[200px]"
                  alt="green iguana"
                  />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.title1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {e.title2}
                  </Typography>
                  <Button className='bg-[#e33e3e] text-[16px] h-[40px] mr-[20px] mt-[20px] ' onClick={()=>dispatch(deleteAlbum(e.id))}>Delete<DeleteIcon/></Button>
                  <Button className='bg-[yellow] text-[16px] h-[40px]' onClick={()=>showModal1(e.id)}>Edit <EditIcon/></Button>
                </CardContent>
              </CardActionArea>
            </Card>
            )
        })
      }
      {
        isModalOpen &&(<>      
      <Modal title="Albumn" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel} footer = {false}>
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
            label="Image"
            name="img"
            rules={[
              {
                required: true,
                message: 'Please put Image!',
              },
            ]}
          >
          <input onChange={handleFile} type="file" name="img" />

          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Header"
            name="title1"
            rules={[
              {
                required: true,
                message: 'Please input First Text!',
              },
            ]}
          >
          <Input />

          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Description"
            name="title2"
            rules={[
              {
                required: true,
                message: 'Please input Second Text!',
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
      <Modal title="Edit Albumn" open={isModalOpen1} onOk={handleOk1}  onCancel={handleCancel1} footer = {false}>
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
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed1}
          autoComplete="off"
        >
      <Row gutter={[10, 0]}>
        <Col span={20}>
          <Form.Item
            label="Image"
            name="img"
            rules={[
              {
                required: true,
                message: 'Please put Image!',
              },
            ]}
          >
          <input onChange={handleFile1} type="file" name="img" />

          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Header"
            name="title1"
            rules={[
              {
                required: true,
                message: 'Please input First Text!',
              },
            ]}
          >
          <Input />

          </Form.Item>
        </Col>
        <Col  span={20}>
          <Form.Item
            label="Description"
            name="title2"
            rules={[
              {
                required: true,
                message: 'Please input Second Text!',
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

export default Album