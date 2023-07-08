import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/subjects');
        console.log(response.data);
        setSubjects(response.data.subjects);
      } catch (err) {
        console.log(err);
        setSubjects([]); // Set subjects to an empty array in case of an error
      };
    };
    fetchSubjects();
  }, []);

  return (
    <div className='container'>
      <h1 className='text-2xl font-bold'>Subjects</h1>
      {
        Array.isArray(subjects) ? (
          subjects.map((subject) => (
            <Link to={`/subjects/${subject._id}`} key={subject._id}>
              <h1 key={subject._id}>{subject.name}</h1>
            </Link>
          ))
        ) : (
          <p>No subjects found.</p>
        )
      }
    </div>
  )
}

export default Subjects
