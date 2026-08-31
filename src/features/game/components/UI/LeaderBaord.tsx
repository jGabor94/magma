import { Avatar, Box, Chip, ListItemAvatar, Paper, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { RankedPlayer } from '../../types'

const LeaderBaord: FC<{ players: RankedPlayer[] }> = ({ players }) => {



    return (
        <>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, pb: 1.25 }}>
                <Typography sx={{ fontSize: 40 }}>
                    🏆
                </Typography>
                <Typography id="leaderboard-title" component="h4" variant="h4">
                    Leaderboard
                </Typography>

            </Stack>
            <Stack sx={{ gap: 1.5 }}>
                {players.map(({ player, originalIndex }, index) => (
                    <Paper key={`${player.name}-${originalIndex}`} sx={{
                        minHeight: 68,
                        display: "grid",
                        gridTemplateColumns: "46px minmax(0,1fr) auto",
                        alignItems: "center",
                        gap: 1.375,
                        p: 1.25,
                        border: "2px solid transparent",
                        borderRadius: "20px",
                        backgroundColor: "#f4f1fb",
                        "&:first-of-type": {
                            background: "linear-gradient(135deg, #fff9d9, #fff0b9)",
                        },
                    }}>
                        <ListItemAvatar>
                            <Avatar {...index === 0 && { sx: { background: "linear-gradient(135deg, #ffe867, #ffbc45)" } }} >
                                {index + 1}
                            </Avatar>
                        </ListItemAvatar>

                        <Typography sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#312657", fontSize: 17, fontWeight: 950 }}>
                            {player.name}
                        </Typography>
                        <Chip
                            label={player.magmaPoints}
                            aria-label={`${player.magmaPoints} magmapont`}
                            title={`${player.magmaPoints} magmapont`}
                            icon={<Box component="img" src="/magma-point.png" alt="" draggable={false} sx={{ width: 24, height: 24, objectFit: "contain" }} />}
                            sx={{
                            whiteSpace: "nowrap",
                            boxShadow: "none",
                            backgroundColor: "#fff",
                            color: "#73658f",
                            fontSize: 12,
                        }} />

                    </Paper>
                ))}
            </Stack>
        </>
    )
}

export default LeaderBaord
