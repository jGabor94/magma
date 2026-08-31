# Material UI

Használj Material UI-t a felhasználói felület megvalósításához.

# hangulat
Az egész alklmazás "cartoon" design-ban készüljön laza játékos party hangulatban MOBIL FIRST megközelítéssel.

## Dokumentáció

Az aktuális Material UI API-khoz és példákhoz használd a hivatalos MUI MCP-t.

Ha az MCP nem érhető el, használd ezt:
https://mui.com/material-ui/llms.txt

## Szabályok

- Részesítsd előnyben az aktuális MUI API-kat.
- Ne használj elavult komponens propokat vagy API-kat.
- Kövesd a projekt meglévő témáját, design paramétereit, komponensmintáit és vizuális logikáját.
- Meglévő felületek módosításakor támaszkodj a már kialakított spacingre, tipográfiára, színekre, méretezésre, elrendezési szabályokra és interakciós mintákra.
- Ne vezess be önkényesen új design rendszert, vizuális irányt vagy eltérő komponenslogikát.
- Új design, nagyobb vizuális átalakítás vagy design-refaktor csak akkor történjen, ha ezt a felhasználó kifejezetten kéri.
- Részesítsd előnyben az `sx` propot és a theme tokeneket az önkényes CSS helyett.
- Ne használj `style` propot csak natív dom elemen. MUI komponensen az `sx` prop használata kötelező.
- Ahol indokolt, használj reszponzív MUI primitíveket és komponenseket.
- Ismeretlen komponens implementálása előtt ellenőrizd a MUI dokumentációját.
- Képekhez használd az MUI Box komponenst: <Box component="img" src="/example.png" />

## Stíluskezelési hierarchia

Alapesetben a MUI stíluskezelés három szintből áll, ebben a prioritási sorrendben:

1. **Theme** – a globális designrendszer és az alkalmazás egészére érvényes alapértékek helye. Ide tartoznak például a színek, tipográfia, spacing, shape, breakpointok és a komponensek globális alapbeállításai.
2. **Styled components** – újrahasznosítható, komponensszintű vizuális szabályokhoz használd, amikor egy adott komponensnek tartós és több helyen is alkalmazott saját megjelenése van de nem az egész alklmazásra általános.
3. **`sx` prop** – lokális, egyedi vagy kontextusfüggő finomhangolásra használd, amikor a módosítás csak az adott komponenspéldányra vonatkozik.

A stílusokat lehetőleg ezen a hierarchián keresztül szervezd. Ne tegyél globális vagy ismétlődő designértékeket indokolatlanul `sx` propokba, és ne hozz létre `styled` komponenst olyan egyszeri módosításra, amely természetesen megoldható `sx`-szel.


## Ikonok
támaszkodj a lucied-react ikonokra