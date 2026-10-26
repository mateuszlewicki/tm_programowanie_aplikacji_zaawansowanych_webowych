# Notatka powtórzeniowa

Klasa 3 technikum informatycznego · programowanie aplikacji webowych

## 1. Co robi program (w skrócie)

Prosta lista zadań: użytkownik wpisuje tekst w pole, klika „Dodaj zadanie”, a program zapisuje nowy obiekt w tablicy i **od nowa rysuje całą listę** na stronie. Przycisk „Delete” jest na razie tylko w wyglądzie – funkcja usuwania (`removeElement`) jest pusta.

## 2. Struktura projektu

| Element | Rola |
| --- | --- |
| `index.html` | Szkielet strony: pole tekstowe, przycisk, kontener na listę |
| `src/main.ts` | Logika aplikacji: obsługa kliknięcia, tablica zadań, budowanie listy |
| `src/TodoEntry.ts` | Klasa reprezentująca jedno zadanie |
| `tsconfig.json` | Ustawienia kompilatora TypeScript |
| `public/main.js` | Plik **wynikowy** (generuje kompilator) – to on jest ładowany w przeglądarce |

Przeglądarka nie rozumie TypeScriptu. Kod `.ts` jest kompilowany poleceniem `tsc` do JavaScriptu (`.js`) i dopiero ten wynik uruchamia strona.

## 3. tsconfig.json – najważniejsze opcje

- `target` – wersja JavaScriptu, do której kompilujemy (tu `es2024`).
- `lib` – dostępne typy i API (`dom` daje typy `HTMLElement`, `HTMLInputElement` itd.).
- `rootDir` – skąd bierzemy pliki źródłowe (`./src`).
- `outDir` – dokąd trafia skompilowany kod (`./public`).
- `strict: true` – włącza ścisłe sprawdzanie typów (m.in. `strictNullChecks`).
- `include` – które pliki kompilować (`src/**/*.ts`).

## 4. Klasa TodoEntry

```ts
class TodoEntry {
    id: number;
    title: string;
    description?: string;   // pole opcjonalne
    isDone?: boolean;       // pole opcjonalne

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }

    render() { return `<div>...</div>`; }
}
export default TodoEntry
```

- **Pola** (`id`, `title`) opisują stan obiektu, **konstruktor** ustawia ich wartości przy tworzeniu (`new TodoEntry(...)`).
- `?` przy nazwie pola oznacza, że pole jest opcjonalne (może mieć wartość `undefined`).
- Metoda `render()` zwraca tekst HTML z użyciem **template literal** (znaki ` ` `i`${...}\`).
- `export default` udostępnia klasę innym plikom.

## 5. Moduły (import / export)

```ts
import TodoEntry from "./TodoEntry.js";
```

- W pliku `index.html` skrypt ładujemy jako moduł: `<script type="module" src="public/main.js">`.
- W imporcie piszemy rozszerzenie **`.js`**, bo przeglądarka widzi już skompilowane pliki, nie `.ts`.
- `export default` → import bez nawiasów klamrowych.

## 6. Praca z DOM w TypeScript

```ts
const addButton: HTMLButtonElement | null = document.querySelector("#todoAddButton");
const todosContainer: HTMLDivElement = document.querySelector("#todoContainer")!;
```

- `document.querySelector(selektor)` zwraca element **albo `null`** – dlatego typ to `HTMLButtonElement | null` (typ unijny).
- `!` (non-null assertion) mówi kompilatorowi: „wiem, że to nie jest null”. Używać ostrożnie – jeśli się mylimy, program wywali błąd w czasie działania.
- Bezpieczniejsza wersja: sprawdzenie `if (addButton && inputTextField && todosContainer) { ... }`.
- `addEventListener('click', funkcja)` podpina reakcję na zdarzenie kliknięcia.
- `innerHTML` – wstawia HTML do elementu; `innerHTML = ""` czyści zawartość.

## 7. Przepływ działania programu

1. Użytkownik wpisuje tekst i klika przycisk.
2. Handler tworzy `new TodoEntry(arrayOfTodos.length, inputTextField.value)` i dodaje do tablicy `arrayOfTodos` (`push`).
3. Pole tekstowe jest czyszczone (`value = ''`).
4. `buildList()` czyści kontener i dla każdego elementu tablicy (`forEach`) dopisuje wynik `element.render()`.

## 8. HTML i Bootstrap

- Bootstrap dołączamy przez CDN (`<link>` w `<head>` i `<script>` przed końcem `<body>`).
- Użyte klasy: `card`, `card-body` (karta), `mt-1`, `mt-3` (margines górny), `shadow` (cień), `btn btn-danger` (czerwony przycisk), `w-25`, `mx-auto` (szerokość i wyśrodkowanie), `vh-100` (pełna wysokość okna), `p-3` (padding), `bg-dark`, `bg-light`, `bg-success`.
- Atrybut `id` służy do znajdowania elementu w JS; `label for="..."` musi wskazywać na `id` pola.

## 9. Błędy i rzeczy do poprawy w tym kodzie

- **Pusta funkcja `removeElement`** i przycisk „Delete” bez obsługi – usuwanie nie działa.
- **`label for="todoInput"`**, a pole ma `id="todoInputField"` – etykieta nie jest powiązana z polem.
- **`id = arrayOfTodos.length`** – po usunięciu elementu identyfikatory mogą się powtórzyć. Lepiej użyć licznika lub `crypto.randomUUID()`.
- **`innerHTML +=` w pętli** – każdorazowo przebudowuje cały HTML; lepiej złożyć tekst raz albo użyć `createElement`.
- **Wstawianie tekstu użytkownika przez `innerHTML`** – możliwy atak XSS (np. wpisanie `<script>`). Bezpieczniej: `textContent` lub `createElement`.
- **Brak walidacji** – można dodać puste zadanie (sprawdzić `value.trim()`).
- **Zbędne `?.`** po `addButton` wewnątrz bloku `if`, który już sprawdził, że nie jest `null`.
- **Nieużywane pola** `description` i `isDone` – można wykorzystać do oznaczania zadań jako wykonane.

## 10. Pytania kontrolne

1. Dlaczego przeglądarka nie uruchamia bezpośrednio pliku `.ts`?
2. Co robi opcja `strict` i dlaczego `querySelector` może zwrócić `null`?
3. Czym różni się pole zwykłe od opcjonalnego?
4. Po co w imporcie jest `.js`, skoro piszemy w `.ts`?
5. Jak zaimplementować usuwanie zadania z tablicy (np. metody `filter` lub `splice`)?
7. Czym różni się `const` od `let` i dlaczego `arrayOfTodos` jest zadeklarowana przez `let`?
8. Do czego służy `export default`?
9. Co robi metoda `forEach` i jak zastąpić ją pętlą `for`?
10. Dlaczego `id` nadawane jako `arrayOfTodos.length` może się powtórzyć po usunięciu zadania?
11. Do czego służy operator `?.` i dlaczego jest zbędny wewnątrz bloku `if`, który sprawdził już `null`?
12. Czym jest template literal (zapis \` \`i jak wstawia się w nim wartości zmiennych?
13. Jak powiązać `label` z polem tekstowym i czy w tym kodzie jest błąd?
14. Jak podpiąć obsługę zdarzenia do przycisku „Delete” utworzonego w metodzie `render()`?
15. Co oznaczają klasy Bootstrap `card`, `card-body`, `mt-1`, `shadow` i `btn-danger`?
16. Czym różni się `querySelector("#id")` od `getElementById("id")`?
17. Co oznacza parametr `e` w funkcji obsługi zdarzenia i do czego służy obiekt zdarzenia?
18. Jak zapobiec dodaniu zadania, gdy pole tekstowe jest puste lub zawiera same spacje?
19. Czy `innerHTML +=` w pętli jest nieefektywne i jeśli tak, to jak można to poprawić?
20. Czym różni się `textContent` od `innerHTML` i które jest bezpieczniejsze?
21. Do czego służą w `tsconfig.json` opcje `lib` i `skipLibCheck`?
22. Po co przy zmiennych z `querySelector` podajemy typy takie jak `HTMLButtonElement` czy `HTMLInputElement`?
24. Jak wykorzystać pole `isDone`, aby oznaczyć zadanie jako wykonane i zmienić wygląd karty?
25. Czym jest funkcja strzałkowa i czym różni się od zwykłej funkcji?
27. Czym jest delegacja zdarzeń i jak użyć jej do obsługi wszystkich przycisków „Delete” w kontenerze?
28. Co się stanie, jeśli załadujemy `public/main.js` bez `type="module"`, a plik zawiera `import`?
29. Do czego służy atrybut `defer` i dlaczego dla skryptów `type="module"` jest zbędny?
30. Jak rozszerzyć konstruktor klasy `TodoEntry` i metodę `render()`, aby obsługiwały pole `description`?
