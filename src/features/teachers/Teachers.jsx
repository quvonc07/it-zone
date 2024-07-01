import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DrawerApp from '../../components/Drawer'
import { Form, Input, Select, message } from 'antd'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'


export default function Teachers() {
  const [teacher, setTeacher] = useState([])
  const [dep, setDep] = useState(false)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [course, setCourse] = useState([])
  const [load, setLoad] = useState(true)
  const [isload, setIsLoad] = useState(false)

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/teacher", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setTeacher(res.data)
          setLoad(false)
        },);
      })
      .catch(error => console.log(error))
  }, [dep])

  useEffect(()=> {
    if(!open)
    setEditData(null)
  }, [open])

  useEffect(()=> {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      setCourse(res.data)
    })
    .catch(error => console.log(error))
  }, [])

  const onFinish = (e) => {
    if (!editData) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/teacher", e, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          setDep(!dep);
          setOpen(false)
          setLoad(false)
          message.success("Teacher added!")
        })
        .catch(error => {
          message.error("Error adding teacher")
        })
      return
    }
    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/teacher/${editData.id}`, e, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setOpen(false)
        setLoad(true)
        setIsLoad(false)
        message.success("Teacher edited")
      })
      .catch(error => {
        message.error("Error")
      })

  };

  const removeTeacher = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/teacher/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(()=> {
      setDep(!dep);
      setLoad(true)
      message.success("Teacher deleted!")
    })
    .catch(error => {
      message.error("Error deleting teacher")
      console.log(error)
    })
  }

  return (
    <>
      <div className='teacher'>
        <div className='page-header'>
          <div className='page-header-title'>Our Teachers</div>
          <button className='add-btn' onClick={() => setOpen(true)}>Add</button>
        </div>
        {
          load ? <Spinner/> : <table className='table'>
          <thead>
            <tr aria-colspan={5}>
              <th>Image</th>
              <th>Fullname</th>
              <th>Profession</th>
              <th>Phone Number</th>
              <th>-/-</th>
            </tr>
          </thead>
          {
            teacher.map(item => (
              <tbody>
                <tr>
                  <td>
                    <img src={item.img} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.job}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={"/info"} className="info">
                      <i className="bi bi-info-circle-fill"></i>
                    </Link>
                    <div className="trash-border">
                      <i className="bi bi-trash3" onClick={()=> removeTeacher(item.id)}></i>
                    </div>
                    <div className="pen">
                      <i className="bi bi-pen" onClick={()=> {
                        setEditData(item)
                        setOpen(true)
                      }}></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
        }
      </div>
      <DrawerApp title={"Teacher"} open={open} setOpen={setOpen}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            initialValue={editData ? editData.name : ""}
            rules={[
              {
                required: true,
                message: 'Please input teacher name!',
              },
            ]}
          >
            <Input placeholder='Enter Teacher fullname' />
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
            <Input placeholder='Enter Teacher img' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.job : ""}
            name="job"
            rules={[
              {
                required: true,
                message: 'Please input teacher profession!',
              },
            ]}
          >
            <Select
            options={ course.map((item) => {
              return { value: item.name, label: item.name}
            })}
            />
          </Form.Item>

          <Form.Item
            initialValue={editData ? editData.phone : ""}
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input Teacher PhoneNumber!',
              },
            ]}
          >
            <Input placeholder='Enter Teacher PhoneNumber' />
          </Form.Item>

          <Form.Item
            initialValue={editData ? editData.work_skills : ""}
            name="work_skills"
            rules={[
              {
                required: true,
                message: 'Please input Teacher work skills!',
              },
            ]}
          >
            <Input placeholder='Enter Teacher work skills' />
          </Form.Item>

          <Form.Item
            initialValue={editData ? editData.description : ""}
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input Teacher description!',
              },
            ]}
          >
            <Input placeholder='Enter Teacher description' />
          </Form.Item>

          <br />
          <button type='submit' className='add-btn' style={{ width: "100%" }} >Add</button>
        </Form>
      </DrawerApp>
    </>
  )
}
