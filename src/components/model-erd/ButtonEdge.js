import React, { useEffect, useRef, useState } from 'react';
import { getBezierPath } from 'reactflow';
import JoinInnerIcon from '@mui/icons-material/JoinInner';

import './ButtonEdeg.css';
import {Fade, FormControl, IconButton, InputLabel, MenuItem, Paper, Popper, Select} from '@mui/material';
import Typography from '@mui/material/Typography';

const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};

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
        if(!selected){
            setIsFusionPopperOpen(false)
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
                                <Typography sx={{ p: 2 }}>
                                    Table 1: Table 2
                                </Typography>
                                {/*<FormControl>*/}
                                {/*    <InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="source-table-label"*/}
                                {/*        id="source-table"*/}
                                {/*        value={age}*/}
                                {/*        label="Source Table"*/}
                                {/*        onChange={handleChange}*/}
                                {/*    >*/}
                                {/*        <MenuItem value={10}>Ten</MenuItem>*/}
                                {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}
                                {/*<FormControl fullWidth>*/}
                                {/*    <InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="demo-simple-select-label"*/}
                                {/*        id="demo-simple-select"*/}
                                {/*        value={age}*/}
                                {/*        label="Target Table"*/}
                                {/*        onChange={handleChange}*/}
                                {/*    >*/}
                                {/*        <MenuItem value={10}>Ten</MenuItem>*/}
                                {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </foreignObject>
        </>
    );
}
