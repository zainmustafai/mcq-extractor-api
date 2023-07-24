import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AllChapters = () => {
  const [chapters, setChapters] = useState([]); //
  const [chapterName, setChapterName] = useState(""); //

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:8081/api/subjects/${subjectid}/chapters`,
        { name: chapterName }
      );
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      setChapters([...chapters, response.data.chapter]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (chapterid) => { };
  const { subjectid } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const URL = `http://localhost:8081/api/subjects/${subjectid}/chapters`;
        console.log(URL);
        const response = await axios.get(URL);
        console.log(response.data);
        setChapters(response.data.chapters);
      } catch (err) {
        console.log(err);
        setChapters([]); // Set chapters to an empty array in case of an error
      }
    };
    fetchChapters();
  }, []);

  return (
    <div>

      <section>
        <form onSubmit={handleSubmit} >
          <fieldset className="flex flex-col items-center gap-4 px-20" >
            <legend>Create New Chapter</legend>
            <label>ENTER CHAPTER NAME</label>
            <input type="text" className="px-8 py-4 text-2xl w-full border-2" placeholder="Chapter Name" onChange={
              (e) => {
                console.log(e.target.value);
                setChapterName(e.target.value);
              }
            } />
            <button type="submit" className="px-8 py-4 bg-slate-400 hover:bg-slate-600" >Create</button>
          </fieldset>
        </form>
      </section>

      <div>
        <h1>All Chapters in the Subject : {subjectid}</h1>
        <ol>
          {Array.isArray(chapters) ? (
            chapters.map((chapter) => (
              <li key={chapter._id} className=" flex  justify-between items-center p-2 border my-4  ">
                <Link
                  className="text-2xl font-bold"
                  to={`/createnew/${subjectid}/${chapter._id}`}
                >
                  <h1>{chapter.name}-----CLICK HERE TO ADD MORE... </h1>
                </Link>
                <Link className="border p-4 m-2" to={`/questions/chapter/${chapter._id}`} >View All Questions</Link>
              </li>
            ))
          ) : (
            <p>No chapters found.</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default AllChapters;
