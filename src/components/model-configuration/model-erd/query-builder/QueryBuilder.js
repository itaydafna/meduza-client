import { Fab, styled } from '@mui/material';
import meduzaWizard from '../../../../assets/meduza-wizard.png';
import { AnimatePresence, motion } from 'framer-motion';
import Builder from './Builder';
import {useBuilderContext} from "../../../../hooks/builder.hooks";
import * as React from "react";

export const BuilderContext = React.createContext();

const QueryBuilder = () => {
    const builderContextValue = useBuilderContext();
    const {closeBuilder, isBuilderOpen, setIsBuilderOpen} = builderContextValue;
    return (
        <BuilderContext.Provider value={builderContextValue}>
            <AnimatePresence>
                {isBuilderOpen ? (
                    <>
                        <Builder closeBuilder={closeBuilder} />
                        <Results
                            initial={{
                                translateX: '60vw',
                            }}
                            animate={{
                                translateX: 0,
                                transition: { delay: 0.4, duration: 0.6 },
                            }}
                            exit={{
                                translateX: '60vw',
                                transition: { delay: 0.4, duration: 0.6 },
                            }}
                            key={2}
                        />
                    </>
                ) : null}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {isBuilderOpen ? null : (
                    <motion.div
                        key={3}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 1 } }}
                        exit={{ scale: 0 }}
                    >
                        <StyledFab
                            onClick={() =>
                                setIsBuilderOpen((isOpen) => !isOpen)
                            }
                        >
                            <img src={meduzaWizard} alt="" height={80} />
                        </StyledFab>
                    </motion.div>
                )}
            </AnimatePresence>
        </BuilderContext.Provider>
    );
};


const StyledFab = styled(Fab)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    bottom: 20px;
    height: 100px;
    width: 100px;
`;

const Results = styled(motion.div)`
  background: #f5f0f0;
  position: absolute;
  height: 100%;
  width: 60vw;
  top: 0;
  right: 0;
`;

export default QueryBuilder;
