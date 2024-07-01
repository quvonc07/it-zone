import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Info() {
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        axios.get("https://65af84f32f26c3f2139b0190.mockapi.io/teacher", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    })

    return (
        <div className='info-row'>
            {
                teacher.map(item => (
                    <>
                        <div key={item.id} className="info-col">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="info-col">
                            <h3 className='teacher-prof'>
                                Teacher of {item.job}
                            </h3>
                            <p className='teacher-name'>
                                {item.full_name}
                            </p>
                            <p className='teacher-tech'>
                                Technologies: {item.work_skills}
                            </p>
                            <p className='teacher-des'>
                                Description: {item.description}
                            </p>
                            <p className='teacher-phone'>
                                phone number: {item.phone}
                            </p>
                        </div>
                    </>
                ))
            }
        </div>
    )
}
