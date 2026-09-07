"use client";

import ModalOverlay from "@/components/ModalOverlay";
import useModalControl from "@/hooks/useModalControl";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  Modal,
  Stack,
  Typography
} from "@mui/material";
import { ChevronDown, CircleHelp } from "lucide-react";
import { FC } from "react";

const gameSteps = [
  "Legalább hárman játsszatok, egy közös készüléken. A nevek sorrendje legyen az ülésrendetek is.",
  "A kijelölt játékos mondjon hangosan egy választ a feladványra, majd a Következő gombbal adja tovább a sort.",
  "Ugyanerre a feladványra válaszoljatok sorban, amíg ki nem tör a vulkán. Nem tudhatjátok előre, mikor történik!",
  "Akinél kitör, nem kap pontot; mindenki más kap 1 magmapontot. Az Új feladat gombbal indulhat a következő kör.",
];

const houseRules = [
  { title: "Új válasz, minden alkalommal", text: "Egy feladványon belül ne ismételjétek egymás válaszait. Egy korábbi válasz apró átfogalmazása se érjen." },
  { title: "Előbb válasz, aztán gomb", text: "Csak a teljes, érthetően kimondott válasz után lépjetek tovább. Ha nem jó a válasz, ugyanaz a játékos próbálkozzon újra." },
  { title: "A vita ne vigye el a bulit", text: "Indulás előtt egyezzetek meg, mit fogadtok el. Kétes válasznál döntsetek gyorsan, közösen; ne a kitörés után írjátok át a szabályt." },
  { title: "Közös tempó, közös esély", text: "Ne súgjatok, ne keressetek rá a válaszra, és ne időzzetek szándékosan a továbbadással. A feladványt csak közös megegyezéssel cseréljétek." },
];

const frequentlyAskedQuestions = [
  { question: "Ki nyer, és ki veszít?", answer: "A több magmapont a jobb. A játék végén a legkevesebb pontot gyűjtő játékos veszít; azonos minimum esetén holtverseny van. A ranglistán bármikor megnézhetitek az állást." },
  { question: "Mikor tör ki a vulkán?", answer: "Minden új körben véletlenszerűen, 10 és 120 másodperc között. A Következő és a Vissza gomb nem indítja újra az időzítőt." },
  { question: "Mi van, ha félrenyomtunk vagy túl nehéz a feladvány?", answer: "A Vissza gombbal visszaléphettek a korábbi játékoshoz. A feladványon lévő csere gomb új feladványt ad, amíg van még nem használt feladat. A csere nem ad új időt, és nem oszt pontot." },
  { question: "Meddig tart egy játék?", answer: "Ti döntitek el, mikor fejezitek be a játék befejezése gombbal. Érdemes előre megegyezni a körök számában. Ha elfogynak a feladványok, az utolsó kitörés után automatikusan megjelenik a végeredmény." },
  { question: "Folytatható később? Kell mindenkinek telefon?", answer: "Elég egy közös készülék. A játékállás az adott böngészőben mentődik, és a kezdőlapon a Játék folytatása gombbal térhettek vissza hozzá. Másik készülékre nem szinkronizálódik. A kör időzítője visszatéréskor újraindul, ezért szünetet inkább két kör között tartsatok." },
  { question: "Miért nem hallom a kitörést?", answer: "Ellenőrizd a készülék és a böngésző hangerejét, valamint hogy nincs-e elnémítva a lap. A böngésző az első kattintásig vagy érintésig blokkolhatja a hangot. A kitörést a képernyőn is látjátok." },
];

const GameGuide: FC = () => {
  const { open, handleOpen, handleClose } = useModalControl();

  return (
    <>
      <Fab
        color="secondary"
        aria-label="Játékszabályok és gyakori kérdések"
        aria-haspopup="dialog"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          right: "calc(env(safe-area-inset-right, 0px) + 16px)",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
          zIndex: "fab",
        }}
      >
        <CircleHelp aria-hidden="true" />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <ModalOverlay
          onClose={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-guide-title"
          tabIndex={-1}
          sx={{
            width: 600,
            maxWidth: "calc(100% - 32px)",
            maxHeight: "calc(100dvh - 64px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            p: 0,
          }}
        >
          <Typography id="game-guide-title" component="h2" variant="h5" sx={{ py: 3, pl: 3, pr: 9, flexShrink: 0 }}>
            Így lesz jó a játék
          </Typography>
          <Box sx={{ px: 3, py: 2, minHeight: 0, overflowY: "auto", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
            <Stack spacing={3}>
              <Box component="section" aria-labelledby="game-guide-basics">
                <Typography id="game-guide-basics" component="h3" variant="h6">A játék menete</Typography>
                <Box component="ol" sx={{ pl: 2.5, mb: 0, "& li + li": { mt: 1 } }}>
                  {gameSteps.map((step) => <Typography component="li" variant="body2" key={step}>{step}</Typography>)}
                </Box>
              </Box>
              <Box component="section" aria-labelledby="game-guide-rules">
                <Typography id="game-guide-rules" component="h3" variant="h6">Irányadó játékszbályok</Typography>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 2 }}>
                  Ezeket ti tartjátok be, az alkalmazás nem ellenőrzi a válaszokat. Alakítsátok a társasághoz, de mindenkire ugyanaz vonatkozzon!
                </Typography>
                <Stack component="ul" spacing={1.5} sx={{ pl: 2.5, my: 0 }}>
                  {houseRules.map(({ title, text }) => (
                    <Box component="li" key={title}>
                      <Typography variant="body2" sx={{ fontWeight: "fontWeightBold" }}>{title}</Typography>
                      <Typography variant="body2">{text}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box component="section" aria-labelledby="game-guide-faq">
                <Typography id="game-guide-faq" component="h3" variant="h6" sx={{ mb: 2 }}>Gyakori kérdések</Typography>
                {frequentlyAskedQuestions.map(({ question, answer }, index) => (
                  <Accordion key={question} sx={{ color: "text.dark" }}>
                    <AccordionSummary
                      expandIcon={<ChevronDown color="currentColor" aria-hidden="true" />}
                      id={`game-guide-question-${index}`}
                      aria-controls={`game-guide-answer-${index}`}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "fontWeightBold" }}>{question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Stack>
          </Box>

        </ModalOverlay>
      </Modal>
    </>
  );
};

export default GameGuide;
