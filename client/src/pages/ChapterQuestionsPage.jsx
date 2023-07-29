import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ChapterQuestionsPage = () => {
    const [questions, setQuestions] = useState([]); //
    const { chapterid } = useParams();

    useEffect(() => {
        try {
            const fetchQuestions = async () => {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/mcqs/${chapterid}`);
                console.log(response.data.mcqs);
                setQuestions(response.data.mcqs);
            };
            fetchQuestions();
        } catch (err) {
            console.log(err);
        };
    }, [])
    return (
        <div>
            <h1 className="text-4xl font-bold text-center w-full">Questions</h1>
            <h2 className='text-center text-6xl  font-black'>TOTAL Questions :-- { questions.length }</h2>
            <div className=" gap-4 border w-full  ">
                {questions.map((question, index) => {
                    return <div className='border my-3 max-w-3xl p-3 mx-auto'>
                        <h1 className='font-bold my-3' > {index} --{question.question}</h1>
                        {
                            question.options.map((option, index) => {
                                return <p>{index}{option}</p>
                            })
                        }
                        <p className='text-center'>{question.answer}</p>
                        <p className='text-center'>{question.explanation}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ChapterQuestionsPage