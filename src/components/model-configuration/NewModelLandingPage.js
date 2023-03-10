import { Button, Fab, Stack, styled, useTheme } from '@mui/material';
import meduzaPlotting from '../../assets/meduza-plotting.png';

import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import { useContext, useState } from 'react';
import DbtImportButton from './DbtImportButton';
import AddNewTable from './AddNewTable';

import { AppContext, ModelContext } from '../App';
import Typography from '@mui/material/Typography';
import VendorImport from './VendorImport';
import { VENDORS } from '../../constants/app.constants';
import { useModelsQuery } from '../../hooks/models.hooks';

const NewModelLandingPage = ({}) => {
    const [isShowImportOptions, setIsShowImportOptions] = useState(false);
    const { isPreviewAnimationPlayedOnce, setIsPreviewAnimationPlayedOnce } =
        useContext(AppContext);

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const modelId = useContext(ModelContext);
    const { data: models } = useModelsQuery();
    const currentModel = models.find((m) => m.id === modelId);
    const isFirst = currentModel.name === 'Model 1';

    return (
        <Container>
            <Content>
                {!isFirst ? (
                    <Typography
                        style={{
                            fontSize: '2em',
                            color: primaryColor,
                            fontFamily: 'Courier New',
                        }}
                    >
                        Hello there!
                    </Typography>
                ) : (
                    <TypeAnimation
                        sequence={["Hello there! I'm Meduza", 1000]}
                        wrapper="div"
                        cursor={false}
                        repeat={1}
                        style={{
                            fontSize: '2em',
                            color: primaryColor,
                            fontFamily: 'Courier New',
                        }}
                    />
                )}
                <img
                    src={meduzaPlotting}
                    height={250}
                    style={{ display: 'inline-block', margin: '10px 0' }}
                />
                {!isFirst ? (
                    <Typography
                        style={{ fontSize: '2em', color: primaryColor, fontFamily: 'Courier New' }}
                    >
                        How should we set up your data model?
                    </Typography>
                ) : (
                    <TypeAnimation
                        sequence={[
                            2000,
                            'How should we set up your data model?',
                        ]}
                        wrapper="div"
                        cursor
                        repeat={1}
                        style={{
                            fontSize: '2em',
                            color: primaryColor,
                            fontFamily: 'Courier New',
                        }}
                    />
                )}
                <Actions
                    animate={
                        isFirst && {
                            opacity: [0, 1],
                            transition: { duration: 0.5, delay: 4.5 },
                        }
                    }
                    onAnimationComplete={() => {
                        setIsPreviewAnimationPlayedOnce(true);
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <AddNewTable />
                        <div style={{ position: 'relative' }}>
                            <Button
                                variant={
                                    isShowImportOptions
                                        ? 'contained'
                                        : 'outlined'
                                }
                                startIcon={<ImportExportRoundedIcon />}
                                onClick={() =>
                                    setIsShowImportOptions((show) => !show)
                                }
                            >
                                Import Existing Model
                            </Button>
                            <AnimatePresence>
                                {isShowImportOptions ? (
                                    <ImportOptions>
                                        <motion.div
                                            key={1}
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: 1,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                            exit={{
                                                scale: 0,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                        >
                                            <VendorImport
                                                vendor={VENDORS.GENIE}
                                            />
                                        </motion.div>
                                        <motion.div
                                            key={2}
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: 1,
                                                transition: {
                                                    delay: 0.2,
                                                    duration: 0.2,
                                                },
                                            }}
                                            exit={{
                                                scale: 0,
                                                transition: {
                                                    delay: 0.2,
                                                    duration: 0.2,
                                                },
                                            }}
                                        >
                                            <VendorImport
                                                vendor={VENDORS.DATORAMA}
                                            />
                                        </motion.div>
                                        <motion.div
                                            key={3}
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: 1,
                                                transition: {
                                                    delay: 0.4,
                                                    duration: 0.2,
                                                },
                                            }}
                                            exit={{
                                                scale: 0,
                                                transition: {
                                                    delay: 0.4,
                                                    duration: 0.2,
                                                },
                                            }}
                                        >
                                            <DbtImportButton />
                                        </motion.div>
                                    </ImportOptions>
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </Stack>
                </Actions>
                {/*<motion.img src={meduzaMain} animate={{scale: [0.8,1, 0.8], transition: {*/}
                {/*        repeat: Infinity,*/}
                {/*        duration: 5*/}
                {/*    }*/}
                {/*}} />*/}
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
    opacity: 1;
    margin-top: 15px;
`;

const ImportOptions = styled('div')`
    position: absolute;
    top: calc(100% + 20px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    width: 200px;
`;

export default NewModelLandingPage;
