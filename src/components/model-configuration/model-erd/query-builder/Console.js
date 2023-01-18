import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button, styled} from "@mui/material";
import copyIcon from '../../../../assets/copy.svg';
import ContentCopy from '@mui/icons-material/ContentCopy';


export function Console() {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    const [isCopied, setIsCopied] = React.useState(false);

     async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(code)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // function ClipboardCopy() {
    //     const [isCopied, setIsCopied] = useState(false);
    //
    //     return (
    //         <div>
    //             <input type="text" value={code} readOnly />
    //             <button>
    //                 <span>{isCopied ? 'Copied!' : 'Copy'}</span>
    //             </button>
    //         </div>
    //     );
    // }


    return (
        <div>
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
            <StyledCopyButton onClick={ () => handleCopyClick()
            }>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                {isCopied ? null : <ContentCopy/>}
            </StyledCopyButton>
        </div>


);
}


const StyledCopyButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    right: 10px;
    border: 5px;
    
`;