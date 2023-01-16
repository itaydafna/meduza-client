import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        white: {
            main: "#ffffff"
        },
        darkGrey : {
            main: '#747272FF'
        }
    },
})

export default theme
