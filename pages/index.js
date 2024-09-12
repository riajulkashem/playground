import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Footer from '@/components/Footer';

const Home = () => {
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState('');
  const [code, setCode] = useState(''); // This state will hold the editor code

  const runCode = async () => {
    const langMap = {
      javascript: 'runJs',
      python: 'runPython',
      cpp: 'runCpp',
      c: 'runC',
      java: 'runJava',
      php: 'runPhp',
      go: 'runGo',
      markdown: 'runMarkdown',
      html: 'runHtml',
      css: 'runCss'
    };

    if (language === '') {
      alert("Please select language to run code")
      return;
    }
    try {
      const res = await fetch(`/api/${langMap[language]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok) {
        if (language === 'css') {
          // Apply CSS to the document or to a specific element
          const styleSheet = document.createElement('style');
          styleSheet.type = 'text/css';
          styleSheet.innerText = data.result;
          document.head.appendChild(styleSheet);
        } else {
          setResult(data.result || 'No output');
        }
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Fetch Error:', error.message); // Debugging output
      setResult(`Error: ${error.message}`);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="w-11/12 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: 'black' }}>
          Programming Language Playground
        </h1>

        <div className="flex justify-between mb-4">
          <button
            onClick={runCode}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-900"
          >
            Run Code
          </button>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="border rounded-lg p-2 bg-blue-600 px-6 py-2"
            style={{ color: 'white' }}
          >
            <option value="">Select a Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <h3 className="text-2xl font-semibold" style={{ color: 'black' }}>
            Output
          </h3>
        </div>

        <div className='flex flex-row w-full gap-5 mx-auto'>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 basis-1/2">
            <CodeEditor language={language} onCodeChange={(value) => setCode(value)} />
          </div>
          <div className='basis-1/2 overflow-y-scroll' style={{ height: '65vh', }}>
            {
              ['css', 'html', 'markdown'].includes(language) ? (
                <div className="bg-gray-200 p-10 rounded-lg" style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: result }} />
              ) : (
                <pre className="bg-gray-200 p-10 rounded-lg" style={{ color: 'black' }}>
                  {result}
                </pre>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
