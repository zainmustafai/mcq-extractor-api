import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const AllChapters = () => {
    const [chapters, setChapters] = useState([]); //
    const { subjectid } = useParams();
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/subjects/${subjectid}/chapters`);
                console.log(response.data);
                setChapters(response.data.chapters);
            } catch (err) {
                console.log(err);
                setChapters([]); // Set chapters to an empty array in case of an error
            };
        };
        fetchChapters();
    }, []);
    return (
        <div>
            <h1>All Chapters in the Subject : {subjectid}</h1>
            <ol>
                {
                    Array.isArray(chapters) ? (
                        chapters.map((chapter) => (

                            <li key={chapter._id}
                            className='p-2 border my-4  '
                            >
                                <Link
                                    className='text-2xl font-bold'
                                    to={`/createnew/${subjectid}/${chapter._id}`}
                                    
                                >
                                    <h1 >{chapter.name}</h1>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No chapters found.</p>
                    )
                }
            </ol>
        </div>
    )
}

export default AllChapters