import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import axios from 'axios';
import { Link } from 'react-router-dom';
const contentStyle = {
  margin: 0,
  width: '100%',
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};



export default function Home() {
  const [student, setStudent] = useState("")
  const [course, setCourse] = useState("")
  const [teacher, setTeacher] = useState("")
  const [group, setGroup] = useState("")

  useEffect(() => {
    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/reception", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => setStudent(res.data.length))

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => setCourse(res.data.length))

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/teacher", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => setTeacher(res.data.length))

    axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/group", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => setGroup(res.data.length))
  })




  return (
    <div>
      <div className="welcome">
        <div className="welcome-row">
          <div className="welcome-col">
            <h1>
              Hello, Ibrohim!
            </h1>
            <p>
              Hope you have a good day
            </p>
          </div>
          <div className="welcome-col">

          </div>
        </div>
      </div>
      <div className="home-content">
        <div className="home-content-left">
          <div className="home-info-row">
            <div className="home-info-col">
              <Link to={"/reception"} className="home-info-col-content">
                <div className="home-info-col-left">
                  <i className="bi bi-people"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    Total Students {student}
                  </p>
                </div>
              </Link>
            </div>
            <div className="home-info-col">
              <Link to={"/group"} className="home-info-col-content">
                <div className="home-info-col-left">
                  <i className="bi bi-person"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    New Groups {group}
                  </p>
                </div>
              </Link>
            </div>
            <div className="home-info-col">
              <Link to={"/course"} className="home-info-col-content">
                <div className="home-info-col-left">
                  <i className="bi bi-layers"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    All Courses {course}
                  </p>
                </div>
              </Link>
            </div>
            <div className="home-info-col">
              <Link to={"/teacher"} className="home-info-col-content">
              <div className="home-info-col-left">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    All Teachers {teacher}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="home-content-right">
            <Carousel autoplay arrows dotPosition="left" infinite={true}>
              <div>
                <h3 style={contentStyle}>
                  <img className='carousel' src="https://avatars.mds.yandex.net/i?id=ba38a6b00991984d30450c10e83cfd27cbc0eb8b-12521952-images-thumbs&n=13" alt="" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img className='carousel' src="https://avatars.mds.yandex.net/i?id=83a6e654b577b01881bfeddf7f8aea0839bdac50-4410396-images-thumbs&n=13" alt="" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img className='carousel' src="https://avatars.mds.yandex.net/i?id=757e47297fcf845e6da5a422ae89512fa63a4393-10511855-images-thumbs&n=13" alt="" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img className='carousel' src="https://avatars.mds.yandex.net/i?id=87c08dafbd59aaaf19318f843ed2a97c86ebf32f-5284058-images-thumbs&n=13" alt="" />
                </h3>
              </div>
            </Carousel>
          </div>
        </div>

      </div>
    </div>
  )
}
