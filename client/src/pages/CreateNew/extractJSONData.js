/****************************************************************************************************************************************** */
export function extractWithExplanation(text) {
  const lines = text.split("\n");
  const mcqData = [];

  let currentQuestion = null;
  let currentOptions = [];
  let currentExplanation = null;

  for (const line of lines) {
    if (line.trim().startsWith("Explanation:")) {
      currentExplanation = line.replace("Explanation:", "").trim();
    } else if (line.trim().startsWith("Answer:")) {
      const answer = line.replace("Answer:", "").trim();
      mcqData.push({
        question: currentQuestion,
        options: currentOptions,
        answer,
        explanation: currentExplanation,
      });
      currentQuestion = null;
      currentOptions = [];
      currentExplanation = null;
    } else if (line.trim().startsWith("View Answer")) {
      currentQuestion = line.replace("View Answer", "").trim();
      // Check if the question text ends with '?' or ' .'
      const lastCharacter = currentQuestion.slice(-1);
      if (lastCharacter === "?" || lastCharacter === ".") {
        currentQuestion = currentQuestion.slice(0, -1);
      }
    } else if (
      line.trim().startsWith("a)") ||
      line.trim().startsWith("b)") ||
      line.trim().startsWith("c)") ||
      line.trim().startsWith("d)")
    ) {
      currentOptions.push(line.trim().substring(2));
    }
  }

  return mcqData;
}

/****************************************************************************************************************************************** */

export function extractWithoutExplanation(text) {
  const lines = text.split("\n");
  const mcqData = [];

  let currentQuestion = null;
  let currentOptions = [];
  let currentExplanation = null;

  for (const line of lines) {
    if (/^\d+\. /.test(line)) {
      if (currentQuestion) {
        mcqData.push({
          question: currentQuestion,
          options: currentOptions,
          explanation: currentExplanation || "",
          answer: "",
        });
      }
      const questionMatch = line.match(/^\d+\. (.+)/);
      if (questionMatch) {
        currentQuestion = questionMatch[1].trim();
      }
      currentOptions = [];
      currentExplanation = null;
    } else if (line.trim().startsWith("Answer:")) {
      const answer = line.replace("Answer:", "").trim();
      if (currentQuestion) {
        mcqData.push({
          question: currentQuestion,
          options: currentOptions,
          explanation: currentExplanation || "",
          answer,
        });
      }
      currentQuestion = null;
      currentOptions = [];
      currentExplanation = null;
    } else if (line.trim().startsWith("Explanation:")) {
      currentExplanation = line.replace("Explanation:", "").trim();
    } else if (
      line.trim().startsWith("a)") ||
      line.trim().startsWith("b)") ||
      line.trim().startsWith("c)") ||
      line.trim().startsWith("d)")
    ) {
      currentOptions.push(line.trim().substring(2));
    } else if (currentExplanation !== null) {
      if (currentExplanation !== "") {
        currentExplanation += " ";
      }
      currentExplanation += line.trim();
    }
  }

  if (currentQuestion) {
    mcqData.push({
      question: currentQuestion,
      options: currentOptions,
      explanation: currentExplanation || "",
      answer: "",
    });
  }

  return mcqData;
}
/****************************************************************************************************************************************** */

const extractJSONData = (string) => {
  const withX = extractWithExplanation(string);
  const withoutX = extractWithoutExplanation(string);

  let finalMCQs = withoutX;
  for (let i = 0; i < withX.length; i++) {
    finalMCQs[i].explanation = withX[i].explanation;
  }
  console.log(finalMCQs);
  console.log(withX.length);
  console.log(withoutX.length);

  return finalMCQs;
};

export default extractJSONData;