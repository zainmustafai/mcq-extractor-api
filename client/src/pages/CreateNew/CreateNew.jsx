import React, { useState } from "react";
import extractJSONData from "./extractJSONData";
import PreviewANDSubmit from "./PreviewANDSubmit";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateNew = () => {
  const { subjectid, chapterid } = useParams();

  const [string, setString] = useState("");
  const [MCQs, setMCQs] = useState([]); // FINAL FINAL ARRAY
  const MCQStack = [];
  const handleInputChange = (e) => {
    setString(e.target.value);
  };
  // BUTTON CLICK CONTROLLER
  const handleExtractData = (e) => {
    e.preventDefault();
    const JSONDATA = extractJSONData(string);
    console.log(JSONDATA);
    setMCQs(JSONDATA);
  };
  /***************************************************************************HANDLE SUBMISSION****************************************************************************************** */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const URL = `http://localhost:8081/api/${subjectid}/${chapterid}/mcqs`;
      const response = await axios.post(URL, {
        mcqs: MCQs,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold underline mt-8">
        ADD STRINGto Extract DATA{" "}
      </h1>
      <form className="flex flex-col items-center justify-center px-16">
        <textarea
          onChange={handleInputChange}
          rows={15}
          className="border-2 border-black p-2 m-2 w-full"
          placeholder="Enter the string here"
        ></textarea>
        <button
          type="button"
          onClick={handleExtractData}
          className="border-2 border-black p-2 m-2 w-1/2"
        >
          EXTRACT DATA FIRST
        </button>
      </form>

      {/* {PREVIEW} */}
      <div className="p-16">
        <div className="border border-dashed">
          {Array.isArray(MCQs) ? (
            MCQs.map((MCQ, index) => (
              <section
                key={index}
                className="border border-blue-400 mx-3 px-4 my-4"
              >
                <h1 className="text-center text-xl font-bold underline my-4">
                  {index} ---p {MCQ.question}
                </h1>
                <div>
                  <span>1 {MCQ.options[0]}</span> <br />
                  <span>2 {MCQ.options[1]}</span> <br />
                  <span>3 {MCQ.options[2]}</span> <br />
                  <span>4 {MCQ.options[3]}</span> <br />
                </div>
                <h2 className="my-3 text-lg font-bold">{MCQ.answer}</h2> <br />
                <p>{MCQ.explanation}</p>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-blue-500 transition-all duration-150 border-2 border-black p-2 m-2 w-full"
                  onClick={() => {
                    setMCQs(MCQs.filter((mcq, i) => i !== index));
                  }}
                >
                  REMOVE IT. It's Dirty Data.
                </button>
              </section>
            ))
          ) : (
            <p>No MCQs found.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="border-2 border-black p-5 m-2 w-full bg-yellow-300 hover:bg-red-800 duration-150 transition-colors "
      >
        SUBMIT ALL
      </button>
    </div>
  );
};

export default CreateNew;
