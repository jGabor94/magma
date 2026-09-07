"use client";

import Logo from "@/components/Logo";
import ToastAlert from "@/components/ToastAlert";
import { createInitialGameState, saveActiveGame } from "@/features/game/lib/gameStorage";
import type { CreateGameInput } from "@/features/game/types";
import { createGameFormSchema } from "@/features/game/zod/schema";
import { CartoonButton } from "@/lib/mui/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft, Play, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const initialPlayers = [
  { name: "Gabesz" },
  { name: "Annamari" },
  { name: "Levi" },
];

const CreatePage: FC = () => {
  const router = useRouter();
  const { control, register, handleSubmit, formState, setError, clearErrors } =
    useForm<CreateGameInput>({
      mode: "all",
      resolver: zodResolver(createGameFormSchema),
      defaultValues: { players: initialPlayers },
    });
  const { fields, append, remove } = useFieldArray({ control, name: "players" });

  const onSubmit = (data: CreateGameInput) => {
    saveActiveGame(createInitialGameState(data.players));
    router.push("/game");
  };

  const onInvalid = () => {
    toast.error("Adj meg legalább 3 érvényes játékosnevet!");
  };

  const addPlayer = () => {
    clearErrors("players");
    append({ name: "" }, { shouldFocus: false });
  };

  const removePlayer = (index: number) => {
    if (fields.length <= 3) {
      setError("players", { type: "min", message: "Legalább 3 játékos szükséges." });
      toast.error("Minimum 3 játékos szükséges.");
      return;
    }

    remove(index);
    clearErrors("players");
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        sx={{
          width: "min(440px, 100%)",
          p: { xs: 2.5, sm: 3.5 },
          textAlign: "center",
        }}
      >
        <Logo sx={{ fontSize: 46, mx: "auto", mb: 5 }} />

        <Typography component="h1" variant="h2">
          Játékosok
        </Typography>
        <Typography
          component="p"
          sx={{
            maxWidth: 330,
            mx: "auto",
            mt: 1.5,
            mb: 2.5,
            color: "text.secondary",
            fontSize: 15,
            lineHeight: 1.45,
          }}
        >
          Legalább 3 játékos kell a játék elindításához.
        </Typography>

        <Stack spacing={1.25} sx={{ mb: 4 }}>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "42px minmax(0, 1fr) 44px",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  border: "3px solid #fff",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #ffe45f, #52dff4)",
                  color: "#302451",
                  fontWeight: 1000,
                  boxShadow: "0 4px 0 #c7bfd9",
                }}
              >
                {index + 1}
              </Box>
              <TextField
                {...register(`players.${index}.name`)}
                placeholder={`Játékos ${index + 1}`}
                slotProps={{
                  htmlInput: {
                    maxLength: 24,
                    "aria-label": `Játékos ${index + 1} neve`,
                  },
                }}
                error={Boolean(formState.errors.players?.[index]?.name)}
                helperText={formState.errors.players?.[index]?.name?.message}
                sx={{
                  minWidth: 0,
                  "& .MuiInputBase-root": { minHeight: 60 },
                  "& .MuiFormHelperText-root": { mx: 0, textAlign: "left" },
                }}
              />
              <IconButton
                type="button"
                onClick={() => removePlayer(index)}
                aria-label={`Játékos ${index + 1} törlése`}
                sx={{
                  width: 44,
                  height: 60,
                  border: 0,
                  borderRadius: 0,
                  background: "transparent !important",
                  color: "#ff4f79",
                  boxShadow: "none !important",
                  "&:hover": { background: "transparent !important", color: "#ff2f64" },
                }}
              >
                <Trash2 size={27} strokeWidth={2.8} />
              </IconButton>
            </Box>
          ))}
        </Stack>



        <CartoonButton
          type="button"
          color="secondary"
          shadow
          gradient
          onClick={addPlayer}
          startIcon={
            <Box
              component="span"
              sx={{
                width: 32,
                height: 32,
                display: "grid",
                flexShrink: 0,
                placeItems: "center",
                border: "3px solid rgba(255,255,255,.58)",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,.14)",
                boxShadow: "0 4px 0 rgba(49,24,82,.2)",
              }}
            >
              <Plus size={16} strokeWidth={3.5} />
            </Box>
          }
          sx={{ width: "100%", minHeight: 60, mb: 1.5, fontSize: "20px !important", transform: "rotate(-0.5deg)" }}
        >
          Játékos hozzáadása
        </CartoonButton>
        <CartoonButton
          type="submit"
          shadow
          gradient
          startIcon={
            <Box
              component="span"
              sx={{
                width: 42,
                height: 42,
                display: "grid",
                flexShrink: 0,
                placeItems: "center",
                border: "3px solid rgba(255,255,255,.58)",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,.14)",
                boxShadow: "0 4px 0 rgba(49,24,82,.2)",
              }}
            >
              <Play size={20} fill="currentColor" strokeWidth={3.5} />
            </Box>
          }
          sx={(theme) => ({
            width: "100%",
            minHeight: 60,
            fontSize: "30px !important",
            transform: "rotate(0.5deg)",
            boxShadow: theme.magma.shadows.light
          })}
        >
          Start
        </CartoonButton>
        <Button
          component={Link}
          href="/"
          variant="text"
          startIcon={<ArrowLeft size={19} strokeWidth={3} />}
          sx={{
            mt: 2,
            minHeight: 40,
            color: "text.dark",
            border: 0,
            "&:hover": { boxShadow: "none", backgroundColor: "rgba(102,82,232,.08)" },
          }}
        >
          Vissza
        </Button>
      </Card>
      <Toaster
        position="bottom-center"
        containerStyle={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        {(notification) => <ToastAlert notification={notification} />}
      </Toaster>
    </Box>
  )
};

export default CreatePage;
