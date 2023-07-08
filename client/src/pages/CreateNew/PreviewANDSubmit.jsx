import React, { Fragment, useState } from 'react'

const PreviewANDSubmit = ({ data }) => {
    const [MCQData, setMCQData] = useState(data);
    console.log(MCQData);
    return (
        <Fragment >
            <div className='border border-dashed' >
                {
                    Array.isArray(MCQData) ? (
                        MCQData.map((MCQ, index) => (
                            <section
                                key={index}
                                className='border border-blue-400' >
                                <h1 className='text-center text-3xl font-bold underline mt-8'>{MCQ.question}</h1>
                                <div><span>{JSON.stringify(MCQ.options)}</span></div>
                                <h2>{MCQ.answer}</h2>
                                <p>{MCQ.explanation}</p>
                            </section>
                        ))
                    ) : (
                        <p>No MCQs found.</p>
                    )
                }
            </div>
        </Fragment>
    )
}

export default PreviewANDSubmit