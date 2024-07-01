import { DatePicker, Form, Input, Spin, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DrawerApp from '../../components/Drawer'
import Spinner from '../../components/Spinner'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';
export default function News() {

  const [news, setNews] = useState([])
  const [dep, setDep] = useState(false)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [load, setLoad] = useState(true)
  const [isload, setIsLoad] = useState(false)
  const [date, setDate] = useState()

  const onChange = (date, dateString) => {
    setDate(dateString)
  };

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/news", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setNews(res.data)
          setLoad(false)
        },);
      })
      .catch(error => console.log(error))
  }, [dep])

  useEffect(() => {
    if (!open)
      setEditData(null)
  }, [open])

  const onFinish = (e) => {
    e.date = date;
    if (!editData) {
      axios.post("https://65af84f32f26c3f2139b0190.mockapi.io/news", e, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          setDep(!dep);
          setOpen(false)
          setLoad(false)
          message.success("News added!")
        })
        .catch(error => {
          message.error("Error adding news")
        })
      return
    }
    axios.put(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${editData.id}`, e, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setOpen(false)
        setLoad(true)
        setIsLoad(false)
        message.success("News edited")
      })
      .catch(error => {
        message.error("Error")
      })

  };

  const removeNews = (id) => {
    axios.delete(`https://65af84f32f26c3f2139b0190.mockapi.io/news/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        message.success("News deleted!")
      })
      .catch(error => {
        message.error("Error deleting news")
        console.log(error)
      })
  }

  return (
    <div>
      <div className='page-header'>
        <div className='page-header-title'>News</div>
        <button className='add-btn' onClick={() => setOpen(true)}>Add</button>
      </div>
      {
        load ? <Spinner /> : <div className="news-col">
          {
            news.map(item => (
              <div className="news-row" key={item.id}>
                <div className="news-row-left">
                  <p>
                    {item.title}
                  </p>
                  <span>
                    {item.date}
                  </span>
                </div>
                <div className="news-row-right">
                  <div className="trash-border">
                    <i className="bi bi-trash3" onClick={() => removeNews(item.id)}></i>
                  </div>
                  <div className="pen">
                    <i className="bi bi-pen" onClick={() => {
                      setEditData(item)
                      setOpen(true)
                    }}></i>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      }
      <DrawerApp title={"News"} open={open} setOpen={setOpen}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="date"
            // initialValue={editData ? editData.date : ""}
            rules={[
              {
                required: true,
                message: 'Please input news text!',
              },
            ]}
          >
            <DatePicker
              defaultValue={editData&&dayjs(editData && editData.date, dateFormat)}
              onChange={onChange}
              style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="title"
            initialValue={editData ? editData.title : ""}
            rules={[
              {
                required: true,
                message: 'Please input news text!',
              },
            ]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <button type='submit' className='add-btn' style={{ width: "100%" }} >{isload ? <Spin size='small' /> : "Add"}</button>

        </Form>
      </DrawerApp>
    </div>
  )
}
