"use client"

import { MouseEvent, useState } from "react";

export interface MenuControl {
    open: boolean,
    handleOpen: (e: MouseEvent<HTMLElement>) => void,
    handleClose: () => void,
    anchorEl: null | HTMLElement
}

const useMenuControl = (): MenuControl => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return { open, handleOpen, handleClose, anchorEl }
}

export default useMenuControl
