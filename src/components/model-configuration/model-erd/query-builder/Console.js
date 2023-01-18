import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export function Console() {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    return (
        <CodeEditor
            // data-color-mode="white"
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
                fontSize: 18,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                borderRadius: "8px",
                height: "300px"
            }}
        />
    );
}
