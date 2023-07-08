import React, { useState } from 'react'
import extractMCQsFromText from './extractMCQsFromText';
import PreviewANDSubmit from './PreviewANDSubmit';

const CreateNew = () => {
    const [string, setString] = useState('');
    const [MCQs, setMCQs] = useState([]); // FINAL FINAL ARRAY
    const MCQStack = [];
    const handleInputChange = (e) => {
        setString(e.target.value);
    };
    // BUTTON CLICK CONTROLLER
    const handleExtractData = (e) => {
        e.preventDefault();
        const MCQData = extractMCQsFromText(string);
        // setString(JSON.stringify(MCQData));
        setString(MCQData);
        console.log(MCQData);
        string.map(
            (MyMCQ) => {
                MyMCQ.answer = MyMCQ.answer.replace(/<br\s*\/?>/gi, '');
                MCQStack.push(MyMCQ);
                return MyMCQ;
            }
        );
        //Set Final McQs;
        setMCQs(MCQStack);
        console.log(MCQStack);
    };
    const handleSubmit = async (e) => {
        try { } catch (err) { };
    };
    return (
        <div>
            <h1 className='text-center text-3xl font-bold underline mt-8'>ADD STRINGto Extract DATA </h1>
            <form className='flex flex-col items-center justify-center px-16'>
                <textarea

                    onChange={handleInputChange}
                    rows={15}
                    className='border-2 border-black p-2 m-2 w-full' placeholder='Enter the string here'>
                </textarea>
                <button type='button' onClick={handleExtractData} className='border-2 border-black p-2 m-2 w-1/2'>EXTRACT DATA FIRST</button>
            </form>

            {/* {PREVIEW} */}
            <div className='p-16'>
                <div className='border border-dashed' >
                    {
                        Array.isArray(MCQs) ? (
                            MCQs.map((MCQ, index) => (
                                <section
                                    key={index}
                                    className='border border-blue-400 mx-3 px-4' >

                                    <h1 className='text-center text-xl font-bold underline my-4'>{MCQ.question}</h1>

                                    <div>
                                        <span>1 {MCQ.options[0]}</span> <br />
                                        <span>2 {MCQ.options[1]}</span> <br />
                                        <span>3 {MCQ.options[2]}</span> <br />
                                        <span>4 {MCQ.options[3]}</span> <br />
                                    </div>

                                    <h2 className='my-3 text-lg font-bold'>{MCQ.answer}</h2> <br />

                                    <p>{MCQ.explanation}</p>
                                </section>
                            ))
                        ) : (
                            <p>No MCQs found.</p>
                        )
                    }
                </div>
            </div>

            <button type='submit' className='border-2 border-black p-2 m-2 w-1/2'>SUBMIT ALL</button>

        </div>
    )
}

export default CreateNew