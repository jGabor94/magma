import { CartoonIconButton } from '@/lib/mui/styled';
import { Card, CardProps } from '@mui/material';
import { X } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface Props extends CardProps {
    onClose: () => void,
    children: ReactNode,
}



const ModalOverlay: FC<Props> = (({ children, onClose, ...boxProps }) => {
    return (<Card  {...boxProps} sx={{
        boxShadow: 10,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: "95%",
        outline: "none",
        p: 2,
        ...boxProps.sx
    }} >
        <CartoonIconButton color="info" sx={{ position: "absolute", top: 16, right: 16 }} onClick={onClose}>
            <X />
        </CartoonIconButton>
        {children}
    </Card>
    )
}

)


export default ModalOverlay
