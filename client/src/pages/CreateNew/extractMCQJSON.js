function extractMCQJSON(text) {
    const mcqList = [];
    const lines = text.split('\n');
    let questionCount = 0;
  
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (line.startsWith(`${questionCount + 1}.`)) {
        const question = line.substring(line.indexOf(' ') + 1);
        const options = [];
        let answer = '';
        let explanation = '';
  
        while (i + 1 < lines.length) {
          line = lines[++i].trim();
          if (line.startsWith('a)') || line.startsWith('b)') || line.startsWith('c)') || line.startsWith('d)')) {
            options.push(line.substring(line.indexOf(' ') + 1));
          } else if (line.startsWith('Answer:')) {
            answer = line.substring(line.indexOf(':') + 2);
          } else if (line.startsWith('Explanation:')) {
            explanation = line.substring(line.indexOf(':') + 2);
            break;
          }
        }
  
        const mcq = {
          question: question,
          options: options,
          answer: answer,
          explanation: explanation,
        };
        mcqList.push(mcq);
        questionCount++;
      }
    }
  
    return JSON.stringify(mcqList, null, 4);
  }
  export default extractMCQJSON;