import ModalOverlay from '@/components/ModalOverlay'
import useModalControl from '@/hooks/useModalControl'
import { CartoonIconButton } from '@/lib/mui/styled'
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded"
import { Modal } from '@mui/material'
import { FC, Fragment } from 'react'
import { RankedPlayer } from '../types'
import LeaderBaord from './UI/LeaderBaord'

const LeaderBoardModal: FC<{ players: RankedPlayer[] }> = ({ players }) => {

    const modalControl = useModalControl()

    return (
        <Fragment>
            <CartoonIconButton
                aria-label="Leaderboard megnyitása"
                onClick={modalControl.handleOpen}

            >
                <EmojiEventsRoundedIcon sx={{ fontSize: 20 }} color="warning" />

            </CartoonIconButton>
            <Modal open={modalControl.open} onClose={modalControl.handleClose} keepMounted={true}>
                <ModalOverlay onClose={modalControl.handleClose} sx={{ width: 400 }}>
                    <LeaderBaord {...{ players }} />
                </ModalOverlay>
            </Modal >
        </Fragment>

    )
}

export default LeaderBoardModal