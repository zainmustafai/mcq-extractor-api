import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/departments/${id}`);
      console.log(response.data);
      setDepartments(departments.filter((department) => department._id !== id));
    } catch (err) {
      console.log(err.message);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const response = await axios.post(`http://localhost:8081/api/departments`, { name });
      console.log(response.data);
      setDepartments([...departments, response.data.department]);
      setName('');
    } catch (err) {
      console.log(err.message);
    };
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/departments`);
        console.log(response.data);
        setDepartments(response.data.departments);
      } catch (err) {
        console.log(err.message);
      };
    };
    fetchDepartments();
  }, []);

  return (
    <div>

      <form onSubmit={handleSubmit}  >
        <fieldset className='flex flex-col px-16 text-center gap-3 ' >
          <legend>Department</legend>
          <label>Dept. Name</label>
          <input
            value={name}
            placeholder='Enter Department Name'
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='p-2 text-xl border' />
          <button className='bg-slate-400 px-8 py-4' type='submit' >CREATE NEW</button>
        </fieldset>
      </form>

      <div>
        <h1>Departments</h1>
        <ul>
          {
            departments?.map(
              (department) => {
                return <li key={department._id} className='flex items-center' >
                  <Link to={`/${department._id}/subjects`} className='w-full block p-10 bg-blue-400 hover:bg-blue-600 my-4 flex-1 '  >{department.name}</Link>
                  <button className='bg-red-400 px-8 py-4' onClick={() => {
                    handleDelete(department._id);
                  }} >DELETE!</button>
                </li>
              }
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Home