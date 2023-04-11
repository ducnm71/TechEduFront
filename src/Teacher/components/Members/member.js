import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import axios from "axios";

const Member = () => {
  const [students, setStudent] = useState();
  const classId = localStorage.getItem("classId")
  const options = ["A - Z", "Z - A", "Latest", "Oldest"];
  const defaultOption = options[0];

  useEffect(() => {
    axios.get(`http://localhost:3000/class/member/${classId}`)
      .then((res) => {
        setStudent(res.data)
      })
      .then(err=>{
        console.log(err);
      })
  },[classId])


  return (
    <SMember>
      <div className="head">
        <h5>Member Of Class</h5>
      </div>
      <div className="memberbtn">
        <form>
          <box-icon name="search" size="md"></box-icon>
          <input placeholder="Enter and press to find" />
          <Dropdown options={options} value={defaultOption} />
        </form>
      </div>
      <div className="memberContent">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Name</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
          {students === undefined || students.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </SMember>
  );
};

export default Member;

const SMember = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .head {
    height: 70px;
    background-color: white;
    margin-left: -2.2%;
    border: 2px solid gainsboro;
    h5 {
      line-height: 70px;
      margin-left: 36%;
      font-weight: bolder;
    }
  }
  .memberbtn {
    width: 70%;
    margin-left: 7%;
    form {
      box-icon {
        position: absolute;
        margin-left: 20px;
        margin-top: 20px;
      }
      display: flex;
      gap: 1rem;

      input {
        width: 80%;
        padding-left: 70px;
        height: 70px;
        font-size: 20px;
        border: 0;
        border-radius: 10px;
        border: 1px solid gainsboro;
      }
      input:hover {
        border: 1px solid black;
      }
      .Dropdown-root {
      width: 170px;

      .Dropdown-control:hover {
        border: 1px solid black;
      }
      .Dropdown-control {
        font-size: 20px;
        border-radius: 10px;
        border: 0;
        height: 70px;
        display: flex;
        align-items: center;
        border: 1px solid gainsboro;
        .Dropdown-arrow {
          margin-top: 12%;
        }
      }
      .Dropdown-option {
        font-size: 15px;
      }
    }
      
      
    }
  }
  .memberContent {
    width: 73%;
    margin-left: 7%;

    table {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      width: 93%;
      border: 1px solid gray;
      border-collapse: collapse;
      text-align: center;
      font-size: 20px;
      background-color: white;
      border-radius: 10px;
      #row1 {
        background-color: lightgray;
      }
      th {
        border: 1px solid gray;
        border-collapse: collapse;
      }
      td {
        border: 1px solid gray;
        border-collapse: collapse;
      }
    }
  }
`;
