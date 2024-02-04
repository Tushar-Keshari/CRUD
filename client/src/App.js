// import logo from './logo.svg';
import './App.css';
import {MdClose} from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [dataList, setDataList] = useState([{}]);

  const handleSubmit = async(e) => { 
    e.preventDefault();
    const data = await axios.post('/create', formData);
    console.log(data);
    console.log('Data has been submitted');
    console.log(formData)
    if(data.data.success){
      alert(data.data.message, 'Data has been submitted');
      setAddSection(false);
    }
    getFetchData();
  }

  const handleOnChange = (e) => {
    console.log(e.target.value);
    const {value, name} = e.target;
    setFormData((prev)=>{
      return {
      ...prev,
      [name]: value
      }
    })
  }

  const getFetchData = async() => {
    const data = await axios.get('/');
    console.log(data);
    console.log('Data has been received');
    if(data.data.success){
      setDataList(data.data.data);
      // alert(data.data.message, 'Data has been submitted');
    }
  }
  console.log(dataList);
  useEffect(()=>{
    getFetchData();
  },[])

  const handleDelete = async(id) => {
    const data = await axios.delete('/delete/'+id);
    console.log(data);
    console.log('Data has been deleted');
    if(data.data.success){
      alert(data.data.message, 'Data has been deleted');
      getFetchData();
    }
  }

  
  return (
    <>
      <div className='container'>
        <button className='btn btn-add' 
        onClick={()=>(setAddSection(true))}>Add</button>

        {
          addSection && (
            <div className='addContainer'>
            <form onSubmit={handleSubmit}>
              <div className='close-btn' onClick={()=>setAddSection(false)}><MdClose/></div>
              <h1>Add User</h1>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' name='name' required onChange={handleOnChange}></input>
  
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' required onChange={handleOnChange}></input>
  
              <label htmlFor='mobile'>Mobile:</label>
              <input type='number' id='mobile' name='mobile' required onChange={handleOnChange}></input>
  
              <button type='submit' className='btn btn-submit'>
                Submit
              </button>
            </form>
          </div>
          )
        }
        
        {
          !addSection && (
            <div className='tableContainer'>
          <h1>User Data</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Delete</th>
              </tr>
            </thead>
            
              { dataList[0] ? 
                (<tbody>
                  {dataList.map((data, index)=>(
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.mobile}</td>
                      <td>
                        <button className='btn btn-edit' 
                        onClick={()=>handleDelete(data._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : 
              (<p>No data found</p>)
              }
              
          </table>
          </div>
          )
        }
      </div>
    </>
  );
}

export default App;
