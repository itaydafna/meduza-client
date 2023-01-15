import ModelNameForm from './ModelNameForm'
import {
    ClickAwayListener,
    styled,
    Tooltip,
    tooltipClasses,
    TooltipProps,
} from '@mui/material'
import * as React from 'react'

const ModelNameTooltip = ({
    closeModelNameTooltip,
    isModelNameTooltipOpen,
    onSubmit,
    initialValue,
    isNew,
    children,
}) => {
    return (
        <ClickAwayListener onClickAway={closeModelNameTooltip}>
            <span>
                <LightTooltip
                    arrow
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    open={isModelNameTooltipOpen}
                    title={
                        <ModelNameForm
                            isNew={isNew}
                            onClickDelete={closeModelNameTooltip}
                            initialValue={initialValue}
                            saveName={onSubmit}
                        />
                    }
                >
                    {children}
                </LightTooltip>
            </span>
        </ClickAwayListener>
    )
}

const LightTooltip = styled(
    ({
        className,
        ...props
    }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    )
)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
}))

export default ModelNameTooltip
