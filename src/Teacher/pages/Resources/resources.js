import React, {useEffect, useState} from 'react'
import * as logo from '../../../Images/logo.png';
import styled from 'styled-components';
import axios from 'axios';
import { Pagination } from 'antd';


const Resources = () => {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState()
  const [detail, setDetail] = useState()
  useEffect(() => {
    axios.get(`https://gold-shiny-lemming.cyclic.cloud/resources/detail/${current}`)
      .then((res) => {
        setDetail(res.data.result)
        setTotal(res.data.count)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[current])

  return (
    <SResource>
      <div className='btn'>
        <div className='title'>
          <img
            src={logo.default}
            alt=""
            style={{ width: "150px", height: "90px" }}
          />
          <h2>TechEdu Share</h2>
        </div>
        <div>
          <box-icon name="search" size="md"></box-icon>
          <input placeholder="Search..." />
        </div>
      </div>

      <div className='detail'>
      {
        detail === undefined || detail.map((item, index) => {
          return(
            <div className='item' 
              key={index}
              onClick={() => {
               window.location.href = item.link
              }}
              >
              <img src={item.img} alt='' style={{width:'150px', height:'200px', borderRadius: '10px'}}/>
              <div className='content'>
                  <div className='date'>
                    <box-icon name='time-five' size='sm'></box-icon>
                    <p>{item.date}</p>
                  </div>
                  <p className='name'>{item.name}</p>
              </div>
          </div>
          )})
      }
      </div>
      <Pagination 
        style={{margin: '1.5% 0 0 -3%', fontSize: '20px', textAlign: 'center'}}
        current={current} 
        total={total}
        pageSize={6} 
        onChange={(page) => {
          console.log(page);
          setCurrent(page);
        }}
        />;
    
    </SResource>
  )
}

export default Resources

const SResource = styled.div`

  margin: 100px 0 0 0;

  width: 100%;
  min-height: 100vh;
  .btn{
    margin: 0 0 0 19%;
    width: 60%;
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
  }
  .detail{
    margin: 2% 0 0 14%;
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    
    .item{
      box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;
      border-radius: 10px;
      padding: 20px 20px;
      background-color: white;
      width: 25%;
      display: flex;
      gap: 1rem;
      align-items: center;
      cursor: pointer;
      .content{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        justify-content: center;
        .date{
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 160px;
          justify-content: center;
          background-color: gainsboro;
          height: 30px;
          border-radius: 20px;
          p{
            font-size: 18px;
            margin-top: 16px;
          }
        }
        .name{
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .item:hover{
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
  }
`