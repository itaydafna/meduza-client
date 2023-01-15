import { Button, Stack, styled, Typography } from '@mui/material';
import meduzaPlotting from '../../assets/meduza-plotting.png';

import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import { useState } from 'react';

function SendIcon() {
    return null;
}

const NewModelLandingPage = () => {
    const [isShowImportOptions, setIsShowImportOptions] = useState(false);

    return (
        <Container>
            <Content>
                <TypeAnimation
                    sequence={["Hello there! I'm Meduza", 1000]}
                    wrapper="div"
                    cursor={false}
                    repeat={1}
                    style={{ fontSize: '2em' }}
                />
                <img
                    src={meduzaPlotting}
                    height={250}
                    style={{ display: 'inline-block', margin: '10px 0' }}
                />
                <Typography></Typography>
                <TypeAnimation
                    sequence={[2000, 'How should we set up your data model?']}
                    wrapper="div"
                    cursor
                    repeat={1}
                    style={{ fontSize: '2em' }}
                />
                <Actions
                    animate={{
                        opacity: [0, 1],
                        transition: { duration: 0.5, delay: 4.5 },
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<GridOnRoundedIcon />}
                        >
                            Create new Custom Model
                        </Button>
                        <div style={{ position: 'relative' }}>
                            <Button
                                variant="contained"
                                startIcon={<ImportExportRoundedIcon />}
                                onClick={() =>
                                    setIsShowImportOptions((show) => !show)
                                }
                            >
                                Import Existing Model
                            </Button>
                            <div style={{position: "absolute"}}>
                                <AnimatePresence>
                                    {isShowImportOptions ? (
                                        <>
                                            <motion.div
                                                key={1}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1,transition: {
                                                    duration: 0.3,
                                                    } }}
                                                exit={{
                                                    scale: 0,
                                                    transition: { duration: 0.3 },
                                                }}
                                            >
                                                <Button>Ginny</Button>
                                            </motion.div>
                                            <motion.div
                                                key={2}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
                                                exit={{
                                                    scale: 0,
                                                    transition: { delay: 0.3, duration: 0.3 }
                                                }}
                                            >
                                                <Button>Datorama</Button>
                                            </motion.div>
                                            <motion.div
                                                key={3}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1, transition: { delay: 0.6, duration: 0.3 } }}
                                                exit={{ scale: 0, transition: { delay: 0.6, duration: 0.3 } }}
                                            >
                                                <Button>DBT</Button>
                                            </motion.div>
                                        </>
                                    ) : null}
                                </AnimatePresence>
                            </div>
                        </div>
                    </Stack>
                </Actions>
            </Content>
        </Container>
    );
};

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`;

const Content = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 800px;
    margin-top: 100px;
`;

const Actions = styled(motion.div)`
    margin-top: 10px;
`;

export default NewModelLandingPage;
