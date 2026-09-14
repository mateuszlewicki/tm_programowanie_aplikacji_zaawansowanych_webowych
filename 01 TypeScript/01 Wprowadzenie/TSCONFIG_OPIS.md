## Co to w ogóle jest?

`tsconfig.json` to plik konfiguracyjny kompilatora TypeScript (`tsc`). Mówi mu, **jakie pliki ma skompilować** i **jak ma to zrobić** — czyli jak zamienić kod `.ts` (TypeScript) na zwykły `.js` (JavaScript), który rozumie przeglądarka.

## `compilerOptions` — opcje kompilatora

**`"target": "es2024"`**
Do jakiej wersji JavaScriptu ma być "przetłumaczony" nasz kod. Nowoczesne funkcje (np. optional chaining `?.`) zostaną dopasowane do możliwości silnika JS zgodnego z ES2024. Im nowszy `target`, tym mniej kompilator musi "upraszczać" kod wstecznie.

**`"lib": ["es2022", "dom", "dom.iterable"]`**
Mówi kompilatorowi, **jakie typy/API ma znać** podczas sprawdzania kodu:
- `"es2022"` — standardowe funkcje JavaScriptu (np. `Array.prototype.map`, `Promise`, itd.)
- `"dom"` — typy związane z przeglądarką, np. `document`, `HTMLButtonElement`, `querySelector` — bez tego TS krzyczałby, że nie zna `document`!
- `"dom.iterable"` — dodatkowe typy do iterowania po strukturach DOM (np. pętla `for...of` po `NodeList`)

**`"module": "none"`**
Mówi kompilatorowi: **nie generuj kodu modułowego** (bez `import`/`export` w wyjściowym pliku `.js`). Dzięki temu plik `.js` można wprost wrzucić do `<script src="...">` bez serwera i bez błędów CORS.

**`"moduleDetection": "auto"`**
Kompilator sam decyduje, czy dany plik `.ts` traktować jako moduł. Jeśli plik **nie zawiera** żadnego `import`/`export`, zostanie potraktowany jako zwykły, globalny skrypt — czyli dokładnie to, czego potrzebujemy do działania bez serwera.

**`"rootDir": "./src"`**
Folder, w którym leżą **pliki źródłowe** (`.ts`), np. `src/main.ts`.

**`"outDir": "./public"`**
Folder, do którego kompilator **zapisuje wynik** (skompilowane pliki `.js`), np. `public/main.js`.

Te dwie opcje razem mówią: "weź pliki z `src/`, a wynik zapisz w `public/`, zachowując tę samą strukturę podfolderów".

**`"strict": true"`**
Włącza **tryb ścisły** — najważniejsza opcja dla nauki dobrego kodu! Wymusza m.in.:
- sprawdzanie, czy zmienna może być `null`/`undefined` (dzięki temu kompilator ostrzeże, jeśli zapomnisz sprawdzić, czy element z `querySelector` w ogóle istnieje)
- jawne typowanie zamiast domyślnego `any`

Warto go zawsze trzymać włączonego — uczy pisania bezpieczniejszego kodu.

**`"skipLibCheck": true"`**
Przyspiesza kompilację — TypeScript **nie sprawdza** typów wewnątrz plików `.d.ts` bibliotek (np. wbudowanych typów DOM). To czysto techniczna optymalizacja, nie wpływa na Twój kod.

## Sekcja poza `compilerOptions`

**`"include": ["src/**/*.ts"]`**
Mówi kompilatorowi, **które pliki ma w ogóle wziąć pod uwagę** do kompilacji — czyli wszystkie pliki `.ts` w folderze `src/` i we wszystkich jego podfolderach (`**` oznacza "dowolna głębokość folderów").

---

**W skrócie:** ten config mówi `tsc`, żeby wziął pliki `.ts` z `src/`, skompilował je do zwykłego (nie-modułowego) JavaScriptu zgodnego z ES2024, ze wsparciem dla typów przeglądarkowych (DOM), włączył ścisłe sprawdzanie typów, i zapisał wynik w `public/` — gotowy do wpięcia w `<script>` bez żadnego serwera.
