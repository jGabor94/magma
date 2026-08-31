import { Card, CardProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface props extends CardProps {
    children: ReactNode
}

const PromptCard: FC<props> = ({ children, ...cardProps }) => {



    return (
        <Card component="section" aria-live="polite" {...cardProps} sx={{
            position: "relative",
            overflow: "hidden",
            px: 2,
            minHeight: { xs: 300, sm: 340 },
            flex: 1,
            isolation: "isolate",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&::before": {
                content: '""',
                position: "absolute",
                zIndex: -1,
                width: 150,
                height: 150,
                top: -92,
                right: -58,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff63b7, #ffbd4a)",
                opacity: 0.72,
                boxShadow: "0 0 0 4px rgba(255,255,255,.72)",
            },
            "&::after": {
                content: '""',
                position: "absolute",
                zIndex: -1,
                width: 84,
                height: 84,
                bottom: -42,
                left: -34,
                borderRadius: "28px",
                background: "linear-gradient(135deg, #5ce1ff, #765bff)",
                transform: "rotate(24deg)",
                boxShadow: "0 0 0 4px rgba(255,255,255,.72)",
            },
            ...cardProps.sx
        }}>
            {children}
        </Card>
    )
}

export default PromptCard