import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const { departmentid } = useParams();
  const [subjectName, setSubjectName] = useState("");

  //
  const deleteSubject = async (subjectid) => {
    try {
      console.log(`Deleting subject with id ${subjectid}`);
      const response = await axios.delete(
        `http://localhost:8081/api/subjects/${subjectid}`
      );
      console.log(response.data);
      setSubjects(subjects.filter((subject) => subject._id !== subjectid));
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/api/departments/${departmentid}/subjects`,
        { name: subjectName }
      );
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      setSubjects([...subjects, response.data.subject]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/departments/${departmentid}/subjects`
        );
        console.log(response.data);
        setSubjects(response.data.subjects);
      } catch (err) {
        console.log(err);
        setSubjects([]); // Set subjects to an empty array in case of an error
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="container">
      <section>
        <form>
          <fieldset className="flex flex-col px-20">
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value);
                setSubjectName(e.target.value);
              }}
              className="p-2 texl-xl border-2 "
              placeholder="Enter Subject To Add New Subject to this Department."
            />
            <button
              type="submit"
              className=" bg-slate-500 px-8 py-4 "
              onClick={handleSubmit}
            >
              Add Subject
            </button>
          </fieldset>
        </form>
      </section>
      <h1 className="text-2xl font-bold">Subjects</h1>
      <ul>
        {Array.isArray(subjects) ? (
          subjects.map((subject) => (
            <li
              key={subject._id}
              className="flex items-center justify-between p-4"
            >
              <Link to={`/subjects/${subject._id}`} key={subject._id}>
                <h1 key={subject._id}>{subject.name}</h1>
              </Link>
              <button
                className="bg-red-500 px-4 py-2"
                onClick={() => {
                  // alert(`Are you sure you want to delete ${subject.name}?`);
                  deleteSubject(subject._id);
                }}
              >
                DELETE SUBJECT
              </button>
            </li>
          ))
        ) : (
          <p>No subjects found.</p>
        )}
      </ul>
    </div>
  );
};

export default Subjects;
