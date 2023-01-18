import React, {useContext, useEffect, useRef} from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button, styled } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import {Download} from "@mui/icons-material";
import {ModelContext} from "../../../App";
import c from '../../../../assets/this-is-a-test-model.zip'

import { BuilderContext } from './QueryBuilder';

export function Console() {
    const modelId = useContext(ModelContext);
    const { querySql } = useContext(BuilderContext);
    const [code, setCode] = React.useState(querySql);
    const [isCopied, setIsCopied] = React.useState(false);

    const downloadRef = useRef();

    useEffect(() => {
        setCode(querySql);
    }, [querySql]);

    async function copyTextToClipboard(text) {getSelection()
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
    };

    const handleDbtClick = () => {
        //const query = generateKipodQuery({modelId, columns, filters, filtersOperation, limit, orderByDirection, orderByColumn, tableNameById})
        // downloadDbtModel(modelId, null).then(console.log);
        downloadRef.current?.click();
    }


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
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    borderRadius: '8px',
                    height: '700x',
                    paddingLeft: '50px',
                    overflowY: 'auto'
                }}
            />
            <StyledCopyButton onClick={() => handleCopyClick()}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                {isCopied ? null : <ContentCopy />}
            </StyledCopyButton>
            <StyledDbtButton onClick={ () => handleDbtClick()
            }>
                <span>{'EXPORT TO DBT MODEL'}</span>
                {<Download/>}
                <a style={{visibility: 'hidden'}} href={'../../../../assets/this-is-a-test-model.zip'} ref={downloadRef} download>Download Img</a>
            </StyledDbtButton>
        </div>
    );
}

const StyledCopyButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    right: 10px;
    border: 5px;
`;


const StyledDbtButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    right: 100px;
    border: 5px;
    
`;

