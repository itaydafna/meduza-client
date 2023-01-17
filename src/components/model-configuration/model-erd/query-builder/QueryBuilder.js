import { Fab, styled } from '@mui/material';
import meduzaWizard from '../../../../assets/meduza-wizard.png';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import Builder from './Builder';
import { ModelErdContext } from '../ModelErd';

const QueryBuilder = () => {
    const { isBuilderOpen, setIsBuilderOpen } = useContext(ModelErdContext);
    const closeBuilder = () => setIsBuilderOpen(false);
    return (
        <>
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
        </>
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
