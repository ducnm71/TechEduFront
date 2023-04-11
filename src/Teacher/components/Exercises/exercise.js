import React, { useState, useRef, useEffect } from "react";
import "react-dropdown/style.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Exercise = () => {
  const [exercise, setExercise] = useState()
  const classId = localStorage.getItem("classId")
  const fileSeclect = useRef();
  const [input, setInput] = useState({
    name: '',
    link: '',
    from: '',
    to: ''
  })
  
  const [path, setPath] = useState("")

const handleUpload = async (e) => {
    e.preventDefault()
    await axios.put('https://weak-pink-cockroach-sari.cyclic.app/class/uploadExercise',{
      name: input.name,
      link: input.link,
      from: input.from,
      to: input.to,
      classId: classId
    })
      .then((res)=> {
        setExercise(res.data)
        toast.success('Upload successfully!')
        let a = document.getElementById("filechoosen")
        a.style.display = "none"
      })
      .catch(err=> {
        console.log(err);
      })

    
  }
  useEffect(()=> {
    axios.get(`https://weak-pink-cockroach-sari.cyclic.app/class/exercise/${classId}`)
      .then(async(res) => {
        setExercise(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },[classId,input])

  

  
  
  


  const [deadline, setDeadline] = useState(false);
  const handleAppear = () => {
    setDeadline(!deadline);
  };

  return (
    <SExercise>
      <div className="head">
        <h5>Exercises</h5>
      </div>
      <div className="exercisebtn">
        <box-icon name="search" size="md"></box-icon>
        <input placeholder="Search..." />
        
        <button type="button" class="btn btn-primary" id="primary" data-toggle="modal" data-target="#exampleModalCenter">
          Upload Exercise
        </button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Upload Exercise</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="item">
                  <label>Title</label>
                  <input type='text' required onChange={async(e) => {setInput({...input, name: e.target.value})}}/>
                </div>
                <div id="file">
                  <label>File</label>
                  <input 
                    onChange={async (e) => {
                      await setPath(e.target.files[0].name)
                      await setInput({...input, link: URL.createObjectURL(e.target.files[0])})
                    }}
                    type="file" 
                    ref={fileSeclect} 
                    hidden />
                  <input 
                    id="choose" 
                    type='button' 
                    value="Choose file" 
                    onClick={() => fileSeclect.current.click()}/>
                  <a id="filechoosen" 
                    style={{'textDecoration':'none', 'fontSize': '20px', 'lineHeight': '50px','marginLeft':'2rem'}}
                    href={path}>{path}</a>
                </div>

                <div className="deadline">
                  <label>Deadline</label>
                  <div className="dl">
                      <div>
                        <label>From</label>
                        <input type='datetime-local' onChange={async(e) => {await setInput({...input, from: e.target.value.replace('T',' ')})
                        }}/>
                      </div>
                      <div>
                        <label>To</label>
                        <input type='datetime-local' onChange={async(e) => {await setInput({...input, to: e.target.value.replace('T',' ')})}}/>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="upload" onClick={handleUpload}>Upload</button>
              </div>
            </div>
          </div>
      </div>
        
    </div>



      <div className="detail">
        {exercise === undefined ||exercise.map((item, index) => {
          return (
            <div
              key={index}
              className="exrcisecontent"
              onMouseEnter={handleAppear}
              onMouseLeave={handleAppear}
            >
              <box-icon type="solid" name="file-pdf" size="lg"></box-icon>
              <a href={item.link}>{item.name}</a>
              <div>
              {item.status === "Scored done" ? (
                <p style={{color: 'green',fontSize: '20px', margin: '0 0 0 700px'}}>{item.status}</p>
              ) : (
                <p style={{color: 'red', fontSize: '20px', margin: '0 0 0 700px'}}>{item.status}</p>
              )}
              </div>
              {deadline && 
                <table style={{position: 'absolute', left: '5%', top:'70%'}}>
                  <tr>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td>Start</td>
                    <td>{item.from}</td>
                  </tr>
                  <tr>
                    <td>End</td>
                    <td>{item.to}</td>
                  </tr>
                </table>
              }
            </div>
          );
        })}

        
      </div>
      <ToastContainer style={{fontSize: '20px', width:'350px'}}/>
    </SExercise>
  );
};

export default Exercise;

const SExercise = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .head {
    margin-left: -2.2%;
    height: 70px;
    background-color: white;
    border: 2px solid gainsboro;
    /* text-align: center; */
    h5 {
      line-height: 70px;
      margin-left: 38%;
      font-weight: bolder;
    }
  }
  .exercisebtn {
    width: 70%;
    margin-left: 7%;
    display: flex;
    gap: 1rem;
    box-icon {
      position: absolute;
      margin-left: 20px;
      margin-top: 20px;
    }
    input {
      width: 78%;
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
    #primary{
      height: 70px;
      font-size: 20px;
      background-color: #6284ff;
    }
    #primary:hover {
        background-color: #0000aa;
      }
      h5{
        font-size: 25px;
        font-weight: bold;
      }
      .modal-content{
        .modal-body{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .item{
          display: flex;
          gap: 1rem;
          label{
            font-size: 22px;
            
          }
          input{
            padding: 10px;
            width: 100%;
            font-size: 18px;
            height: 50px;
          }
        }

        #file{
          /* display: flex; */
          label{
            font-size: 22px;
           
          }
          #choose{
            width: 120px;
            height: 50px;
            margin-left: 1.5rem;
            padding: 0;
          }
        }
        .deadline{
          label{
            font-size: 22px;
          }
          display: flex;
          flex-direction: column;

          .dl{
            display: flex;
            flex-direction: column;
            gap: -0.5rem;
            label{
              font-size: 20px;
              font-weight: lighter;
            }
            input{
              padding: 0 0 0 40px ;
              width: 100%;
              height: 50px;
            }
          }
        }
        
      }
      }
      
    #upload{
      background-color: #6284ff;
    }
    #upload:hover{
      background-color:  #0000aa;
    }
  }

  .detail {
    display: flex;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    .exrcisecontent {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      margin-left: 7%;
      width: 66.5%;
      display: flex;
      gap: 1rem;
      height: 80px;
      border-radius: 10px;
      background-color: white;
      align-items: center;
      border: 1px solid gainsboro;
      box-icon {
        margin-left: 20px;
      }
      a {
        font-size: 20px;
        color: #6284ff;
        text-decoration: none;
      }
      .span {
        font-size: 20px;
        margin-left: 60%;
        color: red;
      }
    }
    table {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      width: 250px;
      border: 1px solid gainsboro;
      border-collapse: collapse;
      text-align: center;
      font-size: 20px;
      background-color: white;
      margin-left: 75%;
      margin-top: -16%;
      tr {
        border-radius: 10px;
        font-size: 15px;
      }
      th {
        border: 1px solid gainsboro;
        border-collapse: collapse;
        padding: 5px 10px;
      }
      td {
        border: 1px solid gainsboro;
        border-collapse: collapse;
        padding: 5px 10px;
      }
    }
  }
  
`;
