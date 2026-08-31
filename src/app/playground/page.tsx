import type { Metadata } from "next";
import { Box, Container, Stack } from "@mui/material";
import ButtonShowcase from "@/features/ui-playground/components/ButtonShowcase";
import CardShowcase from "@/features/ui-playground/components/CardShowcase";
import FeedbackShowcase from "@/features/ui-playground/components/FeedbackShowcase";
import FormShowcase from "@/features/ui-playground/components/FormShowcase";
import PlaygroundHeader from "@/features/ui-playground/components/PlaygroundHeader";
import ShowcaseSection from "@/features/ui-playground/components/ShowcaseSection";

export const metadata: Metadata = {
  title: "UI playground | MAGMA",
  description: "A MAGMA Material UI designrendszerének komponens-játszótere.",
};

export default function PlaygroundPage() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <PlaygroundHeader />
        <Stack spacing={{ xs: 3, md: 4 }}>
          <ShowcaseSection
            eyebrow="01 / Műveletek"
            title="Gombok, amik visszaütnek"
            description="A vastag kontúr, a candy-gradient és a mély alsó árnyék a theme része, ezért minden új MUI Button automatikusan ugyanebben a rajzfilmes világban jelenik meg."
          >
            <ButtonShowcase />
          </ShowcaseSection>
          <ShowcaseSection
            eyebrow="02 / Beviteli elemek"
            title="Űrlapok, de nem unalmasak"
            description="Fókusz-, hiba-, disabled- és interaktív állapotok egy helyen. A mezők érintésbarátak, erős fókuszjelzést kapnak, és mobilon is szépen egymás alá rendeződnek."
          >
            <FormShowcase />
          </ShowcaseSection>
          <ShowcaseSection
            eyebrow="03 / Tartalom"
            title="Kártyák és státuszok"
            description="A játékosok, játékmódok és eredmények ugyanabból a surface-, border- és shadow-rendszerből épülhetnek fel."
          >
            <CardShowcase />
          </ShowcaseSection>
          <ShowcaseSection
            eyebrow="04 / Visszajelzés"
            title="Bumm, történt valami"
            description="Alert, Dialog és Snackbar állapotok tesztelhetően, hogy az alkalmazás későbbi visszajelzései se lógjanak ki a designból."
          >
            <FeedbackShowcase />
          </ShowcaseSection>
        </Stack>
      </Container>
    </Box>
  );
}
