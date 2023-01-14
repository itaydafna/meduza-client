import React, { useEffect, useRef, useState } from 'react';
import { getBezierPath } from 'reactflow';
import JoinInnerIcon from '@mui/icons-material/JoinInner';

import './ButtonEdeg.css';
import { Fade, IconButton, Paper, Popper } from '@mui/material';
import FusionForm from '../FusionForm';

const foreignObjectSize = 40;

export default function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    selected,
    data,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [isFusionPopperOpen, setIsFusionPopperOpen] = useState(false);

    useEffect(() => {
        if (selected) {
            setTimeout(() => setIsFusionPopperOpen(true), 350);
        }
        if (!selected) {
            setIsFusionPopperOpen(false);
        }
    }, [selected]);

    const anchorElementRef = useRef();

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                strokeWidth={5}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div ref={anchorElementRef}>
                    {selected && (
                        <IconButton color="primary">
                            <JoinInnerIcon />
                        </IconButton>
                    )}
                </div>
                <Popper
                    open={isFusionPopperOpen}
                    anchorEl={anchorElementRef.current}
                    placement="top"
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <FusionForm fusionsId={data.id} />
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </foreignObject>
        </>
    );
}
