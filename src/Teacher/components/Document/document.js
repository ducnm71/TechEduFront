import React, {useState, useEffect, useRef} from "react";
import "react-dropdown/style.css";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Document = () => {
  const classId = localStorage.getItem("classId")
  const fileSeclect = useRef();
  const [path, setPath] = useState("")
  const [input, setInput] = useState({
    name: '',
    link: '',
    date: ''
  })

  const [document, setDocument] = useState()

  useEffect(()=> {
    axios.get(`http://localhost:3000/class/document/${classId}`)
      .then(async(res) => {
        setDocument(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },[classId])

  const handleUpload = async (e) => {

    e.preventDefault()
    await axios.put('http://localhost:3000/class/uploadDocument',{
      name: input.name,
      link: input.link,
      date: new Date().toLocaleDateString(),
      classId: classId
    })
      .then((res)=> {
        setDocument(res.data)
        toast.success('Upload successfully!')
        let a = document.getElementById("filechoosen")
        a.style.display = "none"
      })
      .catch(err=> {
        console.log(err);
      })

    
  }
  return (
    <SExercise>
      <div className="head">
        <h5>Document</h5>
      </div>
      <div className="documentbtn">
        <box-icon name="search" size="md"></box-icon>
        <input placeholder="Search..." />
        <button type="button" class="btn btn-primary" id="primary" data-toggle="modal" data-target="#exampleModalCenter">
          Upload Document
        </button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Upload Document</h5>
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
        {document === undefined || document.map((item, index) => {
          return (
            <div className="documentcontent" key={index}>
              <box-icon name="slider-alt" size="md"></box-icon>
              <a href={item.link}>{item.name}</a>
              <span>{item.date}</span>
              {item.date === "01/08/2021" ||
              item.date === "08/08/2021" ||
              item.date === "15/08/2021" ? (
                <box-icon
                  size="md"
                  style={{
                    marginLeft: "50px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    position: 'absolute',
                    left: '85rem'
                  }}
                  name="check-circle"
                ></box-icon>
              ) : (
                <box-icon
                  size="md"
                  style={{
                    marginLeft: "50px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    position: 'absolute',
                    left: '85rem'
                  }}
                  name="x-circle"
                ></box-icon>
              )}
            </div>
          );
        })}
      </div>
      <ToastContainer style={{fontSize: '20px', width:'350px'}}/>
    </SExercise>
  );
};

export default Document;

const SExercise = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .head {
    margin-left: -2.2%;
    height: 70px;
    background-color: white;
    border: 2px solid gainsboro;
    h5 {
      line-height: 70px;
      margin-left: 38%;
      font-weight: bolder;
    }
  }
  .documentbtn {
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
      width: 77%;
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
      padding: 0 10px;
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

    .modal-body{
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .item{
        display: flex;
        align-items: center;
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
    flex-direction: column;
    gap: 1rem;
    .documentcontent {
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
        color: blue;
        text-decoration: none;
      }
      span {
        position: absolute;
        left: 80rem;
        font-size: 15px;
      }
    }
  }
`;
