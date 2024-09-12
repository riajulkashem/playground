import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState('');
  const [code, setCode] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const runCode = async () => {
    const langMap = {
      c: 'runC',
      cpp: 'runCpp',
      css: 'runCss',
      go: 'runGo',
      html: 'runHtml',
      java: 'runJava',
      javascript: 'runJs',
      markdown: 'runMarkdown',
      php: 'runPhp',
      python: 'runPython',
    };

    if (!language) {
      alert('Please select a language to run code');
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
      console.error('Fetch Error:', error.message);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="w-11/12 mx-auto mb-2">
        <h1 className="text-4xl font-bold text-center mb-8">Programming Language Playground</h1>

        <div className="flex justify-between items-center mb-4">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="border rounded-lg bg-gray-600 text-white px-6 py-1"
          >
            <option value="">Select a Language</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="css">CSS</option>
            <option value="go">Go</option>
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="markdown">Markdown</option>
            <option value="python">Python</option>
            <option value="php">PHP</option>
          </select>
          <button
            onClick={runCode}
            className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
          >
            Run Code
          </button>


          <FontAwesomeIcon
            color={isDarkMode ? 'white' : 'dark'}
            icon={faCircleHalfStroke}
            className='absolute right-3 bottom-16 text-4xl cursor-pointer'
            title={isDarkMode ? 'Toggle light mode' : 'Toggle dark mode'}
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex-1">
            <CodeEditor language={language} onCodeChange={(value) => setCode(value)} />
          </div>

          <div className="flex-1 overflow-y-scroll h-5/6 bg-gray-200 dark:bg-gray-700 border-8 border-white dark:border-gray-900 p-5 rounded-lg">
            {['css', 'html', 'markdown'].includes(language) ? (
              <div dangerouslySetInnerHTML={{ __html: result }} />
            ) : (
              <pre className='text-white'>{result}</pre>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
