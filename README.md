# MAGMA 🌋

Egy pörgős, online partijáték, ahol a játékosok egymás után válaszolnak egy feladványra, miközben senki sem tudja, mikor tör ki a vulkán.

> A MAGMA jelenleg korai fejlesztési fázisban van. A játék alapötlete és fő játékmenete már elkészült egy helyi prototípusban, az online alkalmazás pedig Next.js-alapokon készül.

## A játék lényege

A MAGMA játékmenetét a Tick Tack Bumm társasjáték inspirálta, digitális partijátékos köntösben. A kör aktív játékosa választ ad az éppen látható feladványra, majd továbbadja a sort a következő játékosnak. A háttérben futó, kiszámíthatatlan időzítő bármikor vulkánkitörést indíthat.

Ha nálad tör ki a vulkán, nem kapsz pontot, minden más játékos viszont 1 magmapontot gyűjt. A ranglistán a több magmapont a jobb. A játék végén a legkevesebb magmapontot gyűjtő játékos veszít; holtversenynél minden azonos minimumon álló játékos vesztes.

## Játékmenet

1. Adj meg legalább három játékost, és állítsd be a sorrendjüket.
2. Az aktív játékos válaszol a megjelenő feladványra.
3. A **Következő** gombbal add tovább a kört.
4. Ismételjétek, amíg a véletlenszerű időzítő el nem indítja a kitörést.
5. Akinél kitör a vulkán, nem kap pontot; minden más játékos kap 1 magmapontot.
6. Indítsatok új feladatot, és folytassátok a játékot.

A prototípusban az időzítő 10 és 120 másodperc között, véletlenszerűen jár le. A **Vissza** gombbal korrigálható a téves továbbadás, a feladvány cserélhető, az aktuális állás pedig bármikor megnyitható.

## Jelenlegi állapot

A fejlesztési prototípus már tartalmazza:

- a játékosok felvételét és sorrendezését;
- a körök és az aktív játékos kezelését;
- a feladványok léptetését és cseréjét;
- a véletlenszerű kitörést és annak animációját;
- a magmapontok számolását és a ranglistát;
- a játék lezárását és új játék indítását.

Az online, többjátékos Next.js-alkalmazás implementációja még folyamatban van. A helyi HTML-prototípus fejlesztési referenciaként szolgál, ezért szándékosan nem része a repositorynak.

## Fejlesztői környezet

Előfeltételek:

- Node.js 20 vagy újabb;
- npm;
- PostgreSQL a későbbi adatbázis- és autentikációs funkciókhoz.

Telepítés és indítás:

```bash
npm install
npm run dev
```

Az alkalmazás ezután a [http://localhost:3000](http://localhost:3000) címen érhető el.

Hasznos parancsok:

```bash
npm run dev    # fejlesztői szerver
npm run lint   # ESLint ellenőrzés
npm run build  # production build
npm run start  # production szerver
```

## Technológia

- Next.js 16 és App Router;
- React 19;
- TypeScript;
- Drizzle ORM és PostgreSQL;
- NextAuth.js;
- HTML, CSS és JavaScript a helyi interakciós prototípushoz.

## Tervezett irány

- online játékszobák létrehozása és megosztható szobakódok;
- valós idejű többjátékos szinkronizáció;
- szobagazda által vezérelt játékbeállítások;
- bővíthető feladványcsomagok;
- tartós játékosprofilok és eredmények;
- mobilra optimalizált, gyors partijáték-élmény.

## Megjegyzés

A MAGMA független projekt. A Tick Tack Bumm megnevezés a játék inspirációjának bemutatását szolgálja; a projekt nem áll kapcsolatban a társasjáték kiadójával vagy jogtulajdonosaival.
