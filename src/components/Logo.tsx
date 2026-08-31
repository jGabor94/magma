import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'


const Logo: FC<BoxProps> = ({ sx, ...rest }) => {



    return (
        <Box aria-hidden="true" {...rest} sx={{
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            border: "4px solid #fffdf8",
            borderRadius: "24px",
            padding: 1.2,
            width: "max-content",
            background:
                "radial-gradient(circle at 40% 30%, #fff8b8 0 8%, #ffd54f 22%, #ff7a59 48%, #ff3f9b 72%, #6f45db 100%)",
            color: "#301749",
            fontSize: 22,
            fontWeight: 950,
            boxShadow: "6px 7px 0 rgba(24,14,54,.55), 0 0 0 5px rgba(86,231,255,.12), 0 10px 28px rgba(255,63,155,.28)",
            transform: "rotate(-4deg)",
            ...sx
        }}>
            🌋
        </Box>)
}

export default Logo