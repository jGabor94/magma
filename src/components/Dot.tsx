import { Box } from '@mui/material'
import { FC } from 'react'

const Dot: FC = () => (
    <Box
        aria-hidden="true"
        sx={{
            width: 12,
            height: 12,
            flexShrink: 0,
            border: "3px solid #fffdf8",
            borderRadius: "50%",
            backgroundColor: "#44e3ff",
            boxShadow:
                "3px 4px 0 rgba(28,16,58,.46), 0 0 0 6px rgba(68,227,255,.14), 0 0 18px rgba(68,227,255,.72)",
        }}
    />
)


export default Dot