import React from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner'

import { useEffect, useState } from 'react'
import { Form, Input, Select, Spin, message } from 'antd'
import DrawerApp from '../../components/Drawer'

export default function Reception() {
  const [isload, setIsLoad] = useState(false)
  const [student, setStudent] = useState([])
  const [courses, setCourses] = useState([])
  const [dep, setDep] = useState(false)
  const [load, setLoad] = useState(true)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/reception", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setStudent(res.data)
          setLoad(false)
        },);
      })
      .catch(error => console.log(error))
  }, [dep])

  useEffect(() => {
    if (!open)
      setEditData(null)
  }, [open])

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
      headers: {
        "Content-Type": "application/json"
      }

    })
      .then(res => {
        setCourses(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  const onFinish = (e) => {

    setIsLoad(true)
    if (!editData) {

      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/reception", e, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          setDep(!dep);
          setLoad(true)
          setOpen(false)
          message.success("Reception created")
          setIsLoad(false)
        })
        .catch(error => {
          message.error("Error")
        })
      return
    }
    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/reception/${editData.id}`, e, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        setOpen(false)
        setIsLoad(false)
        message.success("Reception edited")
      })
      .catch(error => {
        message.error("Error")
      })

  };
  const removeStudent = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/reception/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        message.success("Student deleted")
      })
      .catch(error => {
        message.error(error?.message)
        console.log(error)
      })
  }
  return (


    <div>

      <div className='page-header'>
        <div className='page-header-title'>Reception </div>
        <button className='add-btn' onClick={() => setOpen(true)} >  Add</button>
      </div>

      {

        load ? < Spinner /> : <table className='table'>

          <thead>
            <tr aria-colspan={5}>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Course</th>
              <th>-/-</th>
            </tr>
          </thead>

          {
            student?.map(item => (

              <tbody key={item.id}>
                <tr >
                  <td>{item.student_name}</td>
                  <td>{item.student_surname}</td>
                  <td>{item.student_phone}</td>
                  <td>
                    {/* <img src={item.course} alt="" /> */}
                    <div>{item.course.name}</div>
                  </td>
                  <td>
                    <div className="trash-border">
                      <i onClick={() => removeStudent(item.id)} className="bi bi-trash3"></i>
                    </div>
                    <div className="pen" onClick={() => {
                      setEditData(item);
                      setOpen(true)
                    }}>
                      <i className="bi bi-pen"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      }





      <DrawerApp title={"Reception"} open={open} setOpen={setOpen}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="student_surname"
            initialValue={editData ? editData.student_surname : ""}
            rules={[
              {
                required: true,
                message: 'Please input your surname!',
              },
            ]}
          >
            <Input placeholder='Enter student surname' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.student_name : ""}
            name="student_name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder='Enter student name' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.student_phone : ""}
            name="student_phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone',
              },
            ]}
          >
            <Input placeholder='Enter student phone' />
          </Form.Item>
          <Form.Item
            initialValue={editData ? editData.course : ""}
            name="course"
            rules={[
              {
                required: true,
                message: 'Please choose course',
              },
            ]}
          >
            <Select
              options={courses.map((item) => {
                return { value: item.name, label: item.name }
              })}
            />
          </Form.Item>

          <br />
          <button type='submit' className='add-btn' style={{ width: "100%" }} >{isload ? <Spin size='small' /> : "Add"}</button>
        </Form>
      </DrawerApp>

    </div>
  )
}
