import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
  

const Class = () => {
  const [className, setclassName] = useState('')
  const [selected, setSelected] = useState(0)
  const [classes, setClasses] = useState([])

  const handleJoin = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('jwt')
    console.log(token);
    const config = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: 'Bearer ' + token
      }
    }
    axios.get(`https://gold-shiny-lemming.cyclic.cloud/class/find/${className}`, config)
      .then((res) => {
        setclassName('')
        toast.success('Join the class successfully')
      })
      .catch(err => {
        toast.error(err.response.data);
      })
  }

  const options = [
    'A - Z', 'Z - A', 'Latest', 'Oldest'];
  const defaultOption = options[0];

  const id = localStorage.getItem("id")
  const [dataClases, setdataClases] = useState()
  useEffect(() => {
    axios.get(`https://gold-shiny-lemming.cyclic.cloud/class/student/${id}`)
    .then(res =>{
      const dataClases = res.data
      setdataClases(dataClases)
    })
  }, [className,id])

  useEffect(() => {
    axios.get('https://gold-shiny-lemming.cyclic.cloud/class/all')
    .then((res) => {
      console.log(res.data);
      setClasses(res.data)
    })
    .catch(err => console.log(err))
  },[])


  return (
    <SClass>
      <div className="classBtn">
        <button onClick={() => setSelected(0)} className={selected===0?'classSelect':''}>Your Classes</button>
        <button onClick={() => setSelected(1)} className={selected===1?'classSelect':''}>Waiting Classes</button>
        <button onClick={() => setSelected(2)} className={selected===2?'classSelect':''}>Hidden Classes</button>
      </div>
      <div className="activity">
        <form>
          <input type='text' name="nameClass" placeholder="Searching..."/>
          <box-icon name='search'></box-icon>
        </form>
        <Dropdown options={options} 
        value={defaultOption} />
        
        <div className='showModal'>
          <button type="button" id='btn-primary' class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            + Find Class
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Find Classes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <select class="form-select" aria-label="Default select example" 
                  onChange={(e) => setclassName(e.target.value)}
                >
                <option selected>List classes</option>
                {classes.map((item)=>{
                  return(
                    <option key={item.id} value={item._id}>{item.name}</option>
                  )
                })}
            </select>
              </div>
              <div class="modal-footer">
                
                <button type="submit" class="btn btn-primary" onClick={handleJoin}>Join</button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <ToastContainer style={{fontSize: '20px', width:'350px'}}/>
      <div className='content'>
      {
        selected===0?
        <div className='listClass'>
        {dataClases === undefined || dataClases.map((classItem, index) => {
            return (
              <div onClick={async(e) => {
                e.preventDefault()
                toast.loading("please wait a second!")
                await localStorage.setItem("className", classItem.name)
                await localStorage.setItem("classId", classItem.id)
                await localStorage.setItem("teacherImg", classItem.teacherImg)
                await localStorage.setItem("teacherName", classItem.teacherName)
                return(
                  setTimeout(() => {
                    window.location.replace(`https://tech-edu.vercel.app/class/detail/${classItem._id}`)
                  },2000)
                  
                
                )}} className='classItem' key={index}>
                <img src={classItem.img} alt=''/>
                <h5>{classItem.name}</h5>
                <p>ID of class: {classItem.id}</p>
                <p>Teacher: {classItem.teacherName}</p>
            </div>
            )
          
          
        })}
        </div>
        :
        <div className='waitClass'>
          <img src='https://shub.edu.vn/images/empty-class.png' alt=''/>
          <p>There are no classes here yet</p>
        </div>

      }
      </div>
    </SClass>
  )
}

export default Class

const SClass = styled.div`
  width: 100%;
  margin: 6% 0 0 3%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 3rem;
  min-height: 800px;
  .classBtn {
    display: flex;
    gap: 1rem;
    margin-right: 50px;
    button {
      border-radius: 5px;
      border: 0;
      height: 30px;
      width: 150px;
      background-color: white;
      font-size: 17px;
      border: 1px solid gainsboro;
    }
    .classSelect{
      border: 0px;
      background-color: #6284FF;
      color: white;
  }
  }
  
  .activity{
    .modal-body{
      padding-bottom: 50px;
    }
    margin-right: 50px;
    display: flex;
    gap: 1rem;
    form{
      display: flex;
      align-items: center;
      input {
      width: 1300px;
      border-radius: 10px;
      font-size: 15px;
      border: 0;
      height: 50px;
      border: 1px solid gainsboro;
      padding: 1rem 1rem;
      }
      box-icon{
        margin-left: -5%;
      }
      input:hover{
      border: 1px solid black;
      }
    }
    
    
    .Dropdown-root {
      width: 200px;
      .Dropdown-control:hover{
        border: 1px solid black;
        
      }
      .Dropdown-control{
        font-size: 15px;
        border-radius: 10px;
        border: 0;
        height: 50px;
        display: flex;
        align-items: center;
        border: 1px solid gainsboro;
        .Dropdown-arrow{
          margin-top: 5%;
        }
      }
      .Dropdown-option{
        font-size: 15px;
      }
      
    }
    button {
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 54px;
      border-radius: 10px;
      font-size: 15px;
      background-color: #6284FF;
      font-weight: bolder;
      color: white;
    }
    button:hover{
      background-color: #0000AA;
    }
  }
  .content{
    .listClass{
    margin-top: 1%;
    display: flex;
    gap: 3rem;
    align-items: center;
    flex-wrap: wrap;
    }
    
    .classItem{
      
      box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;;
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  
      border-radius: 10px;
      border: 2px solid gainsboro;
      img{
      border-radius: 10px 10px 0 0;
     
      width: 400px;
      height: 200px;
      }
      p{
      font-size: 17px;
      margin-bottom: -0.1px;
      }
    }
    .classItem:hover{
      transition: 0.5s;
      transform: scale(1.1);
      background-color: white;
    }
    .waitClass{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5%;
      img{
        width: 400px;
        height: 300px;
      }
    }
  }
  .showModal{
    #btn-primary{
      height: 50px;
    }
    .close{
      background-color: white;
      width: 50px;
      height: 50px;
      color: black;
    }
    .close:hover{
      border: 1px solid black;
      background-color: white;
      border-radius: 0;
    }
    .modal-body{
      label{
        font-size: 18px;
      }
      input{
        width: 100%;
        font-size: 18px;
      }
    }
    .modal-footer{
      button{
        width: 70px;
        height: 40px;
      }
      
    }
  }
`