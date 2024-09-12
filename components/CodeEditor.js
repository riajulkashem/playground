import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { go } from '@codemirror/lang-go';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { markdown } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

const CodeEditor = ({ language, onCodeChange }) => {
    const [editorCode, setEditorCode] = useState('');

    const handleEditorChange = (value) => {
        setEditorCode(value);
        if (onCodeChange) {
            onCodeChange(value); // Pass code back to parent
        }
    };

    const getLanguage = () => {
        switch (language) {
            case 'python': return python();
            case 'javascript': return javascript();
            case 'php': return php();
            case 'go': return go();
            case 'c': return cpp();
            case 'cpp': return cpp();
            case 'java': return java();
            case 'markdown': return markdown();
            case 'html': return html();
            case 'css': return css();
            default: return javascript();
        }
    };

    return (
        <CodeMirror
            value={editorCode}
            height="70vh"
            theme="dark"
            extensions={[getLanguage()]}
            onChange={(value) => handleEditorChange(value)}
        />
    );
};

export default CodeEditor;
