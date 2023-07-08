const  extractMCQsFromText = (text)=> {
    const mcqRegex = /<p>(\d+)\. (.+?)<br>([\s\S]+?)<\/p>\s+<div[^>]+>(Answer: ([a-z])<br>[\s\S]+?)<\/div>/g;
    const explanationRegex = /Answer: ([a-z])<br>\s+(?:Explanation: (.+?)<br>)?/;
  
    let mcqs = [];
    let match;
    while ((match = mcqRegex.exec(text)) !== null) {
      const questionNumber = match[1];
      const question = match[2];
      const optionsRaw = match[3];
      const answer = match[4];
  
      const optionsRegex = /[a-z]\) (.+?)<br>/g;
      let options = [];
      let optionMatch;
      while ((optionMatch = optionsRegex.exec(optionsRaw)) !== null) {
        options.push(optionMatch[1]);
      }
  
      const explanationMatch = explanationRegex.exec(match[5]);
      const explanation = explanationMatch || '';
  
      const mcq = {
        questionNumber,
        question,
        options,
        answer,
        explanation,
      };
      mcqs.push(mcq);
    }
  
    return mcqs;
  }

  export default extractMCQsFromText;