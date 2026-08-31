"use client"

import { Button, ButtonProps, IconButton, styled } from "@mui/material";

type CartoonButtonProps = {
    shadow?: boolean;
    gradient?: boolean
};


const BaseCartoonButton = (props: ButtonProps) => (
    <Button variant="contained" {...props} />
);
export const CartoonButton = styled(BaseCartoonButton, {
    shouldForwardProp: (prop) => prop !== "shadow" && prop !== "gradient",
})<CartoonButtonProps>(({ theme, shadow, gradient, color = "primary" }) => ({
    boxShadow: shadow ? theme.magma.shadows.light : "none",
    ...color !== "inherit" && theme.palette[color].contrastText && {
        color: theme.palette[color].contrastText
    },
    background: gradient && color && color in theme.magma.gradients
        ? theme.magma.gradients[color as keyof typeof theme.magma.gradients]
        : undefined,
    "&:hover": {
        boxShadow: shadow ? theme.magma.shadows.light : "none",
    },
}));

export const CartoonIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "shadow" && prop !== "gradient",
})<CartoonButtonProps>(({ theme, shadow, color: c, gradient }) => {

    const color = c && c !== "default" && c !== "inherit" ? c : "info"
    let background: string = theme.palette[color].main

    if (gradient && color in theme.magma.gradients) {
        background = `linear-gradient(135deg, ${theme.palette[color].light}, ${theme.palette[color].dark})`
    }


    return {
        boxShadow: shadow ? theme.magma.shadows.light : "none",
        background,
        ...color && theme.palette[color].contrastText && {
            color: theme.palette[color].contrastText
        },
        "&:hover": {
            boxShadow: shadow ? theme.magma.shadows.light : "none",
            background
        }
    }
}
) 