import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
const Swal = require('sweetalert2')

const TAttend = () => {

  const [students, setStudent] = useState();
  useEffect(() => {
    axios.get(`https://weak-pink-cockroach-sari.cyclic.app/teacher/member`)
      .then((res) => {
        setStudent(res.data)
      })
      .then(err=>{
        console.log(err);
      })
  })

  
  return (
    <SAttend>
        <h2>Attendance sheet on {new Date().toLocaleDateString()}</h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Name</th>
              <th scope="col">Present</th>
              <th scope="col">Absent</th>
            </tr>
          </thead>
          <tbody>
          {students === undefined || students.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td><input className='check' type="checkbox" /></td>
                <td><input className='check' type="checkbox" /></td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <button onClick={()=>{
          Swal.fire({
            title: 'Success!',
            text: 'You have done the attendance',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        }}>Save</button>
    </SAttend>
  )
}

export default TAttend

const SAttend = styled.div`
  position: absolute;
  top: 10%;
  width: 98%;
  h2{
    text-align: center;
  }
  table{
    font-size: 20px;
    input.check {
      width: 20px;
      height: 20px;
      margin-left: 25px;
    }
  }
  button{
    font-size: 20px;
    color: white;
    padding: 10px 30px;
    background-color: #6284ff;
    border: 0;
    border-radius: 10px;
    margin-left: 94%;
  }
  button:hover{
    background-color: #0000aa;
  }
  
`