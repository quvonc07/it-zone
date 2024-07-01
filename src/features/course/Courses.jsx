
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import DrawerApp from '../../components/Drawer'
import { Form, Input } from 'antd'
export default function Courses() {
  const [course, setCourse] = useState([])
  const [load, setLoad] = useState(true)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [dep, setDep] = useState(false)
  useEffect(() => {

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setCourse(res.data)
          setLoad(false)
        },);
      })
      .catch(error => console.log(error))
  }, [dep])

  useEffect(() => {
    if (!open)
      setEditData(null)
  }, [open])


  const onFinish = (values) => {
    if (!editData) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/courses", values, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          setDep(!dep);
          setLoad(true)
          setOpen(false)
        })
        .catch(error => console.log(error))
      return
    }
    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${editData.id}`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        setOpen(false)
      })
      .catch(error => console.log(error))

  };

  const removeCourse = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
      })
      .catch(error => console.log(error))
  }
  return (
    <>
      <div className='page-header'>
        <div className='page-header-title'>Popular courses   </div>
        <button className='add-btn' onClick={() => setOpen(true)}>Add</button>
      </div>
      <div className='course-row'>
        {
          load ? <Spinner />
            :
            course.map(item => (
              <div key={item.id} className="course-col">
                <div className="course-image-row">
                  <div className="course-image-col">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="course-image-col">
                    <i className="bi bi-three-dots-vertical"></i>
                    <ul className='dropdown'>
                      <li>
                        <i className="bi bi-pencil-fill" onClick={() => {
                          setEditData(item);
                          setOpen(true)
                        }}></i>
                      </li>
                      <li>
                        <i className="bi bi-trash3-fill" onClick={() => removeCourse(item.id)}></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <h1 className='course-col-title'>
                  {item.name}
                </h1>
                <p className='duration'>
                  Duration: <span className='course-green'>{item.duration}</span>
                </p>
                <p className='price'>
                  Price: <span className='brown'>{item.price}UZS/Month</span>
                </p>
                <div className="course-col-line"></div>
                <p className='comment'>
                  {item.description}
                </p>
              </div>
            ))
        }
      </div>
      <DrawerApp title={"Course"} open={open} setOpen={setOpen}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            initialValue={editData ? editData.name : ""}
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder='Enter course name' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.img : ""}
            name="img"
            rules={[
              {
                required: true,
                message: 'Please input img url!',
                // type:"url"
              },
            ]}
          >
            <Input placeholder='Enter course img' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.price : ""}
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input course price!',
              },
            ]}
          >
            <Input placeholder='Enter course price' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.duration : ""}
            name="duration"
            rules={[
              {
                required: true,
                message: 'Please input course duration!',
              },
            ]}
          >
            <Input placeholder='Enter course duration' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.description : ""}
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input course description!',
              },
            ]}
          >
            <Input placeholder='Enter course description' />
          </Form.Item>

          <br />
          <button type='submit' className='add-btn' style={{ width: "100%" }} >Add</button>
        </Form>
      </DrawerApp>
    </>

  )
}
