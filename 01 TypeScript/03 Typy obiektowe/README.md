# Temat: Typy obiektowe – `type` i `interface`

## Alias typu – `type`
Opisuje kształt obiektu. Pola rozdzielamy przecinkami lub średnikami.

```ts
type Todo = {
  id: number,
  title: string,
  description?: string,   // pole opcjonalne
  isDone?: boolean        // pole opcjonalne
}
```

### Pole opcjonalne – `?`
Znak `?` przy nazwie pola oznacza, że pole **nie musi** występować w obiekcie.
Typ takiego pola to w praktyce `string | undefined`.

```ts
let a: Todo = { id: 1, title: "kabel" };                         // OK
let b: Todo = { id: 2, title: "gniazdko", description: "230V" }; // OK
```

Przed użyciem pola opcjonalnego trzeba sprawdzić, czy istnieje:
```ts
if (a.description) {
  console.log(a.description.toUpperCase());
}
```

## Interfejs – `interface`
```ts
interface Produkt {
  ean: string;
  nazwa: string;
  kategoria: string;
  ilosc: number;
}
```

### `type` a `interface`
| | `type` | `interface` |
|---|---|---|
| Opis kształtu obiektu | tak | tak |
| Składnia | `type X = { ... }` (ze znakiem `=`) | `interface X { ... }` (bez `=`) |
| Unie, typy proste, krotki | tak: `type Id = number \| string` | nie, tylko obiekty |
| Rozszerzanie | `type B = A & { ... }` | `interface B extends A { ... }` |
| Łączenie deklaracji | nie – druga deklaracja o tej samej nazwie to błąd | tak – dwie deklaracje `interface X` sumują się w jedną |

Przy zwykłym opisie obiektu (jak `Todo` czy `Produkt`) oba zapisy działają tak samo – kompilator sprawdza je identycznie.

```ts
// łączenie deklaracji – tylko interface
interface Produkt { cena: number; }
// teraz Produkt ma: ean, nazwa, kategoria, ilosc, cena
```

## Tablice obiektów
```ts
let arrayOfTodos: Todo[] = [];
arrayOfTodos.push({ id: 0, title: "kabel" });   // OK
arrayOfTodos.push({ title: "kabel" });          // BŁĄD
```

Druga linia nie skompiluje się, bo pole `id` nie ma `?` – jest **wymagane**:
```
Argument of type '{ title: string; }' is not assignable to parameter of type 'Todo'.
  Property 'id' is missing in type '{ title: string; }' but required in type 'Todo'.
```

## Przykład – magazyn produktów
```ts
type Produkt = {
  nazwa: string,
  ilosc: number
}

let produkty: Produkt[] = [];
produkty.push({ nazwa: "kabel", ilosc: 10 });
```

## Pytania kontrolne
1. Co oznacza znak `?` przy polu `description`?
2. Czym różni się `interface Produkt { ... }` od `type Todo = { ... }`?
3. Dlaczego `arrayOfTodos.push({ title: "kabel" })` zgłasza błąd?
4. Napisz typ `Produkt` z polami `nazwa` (tekst) i `ilosc` (liczba) i dodaj do tablicy produkt „kabel” w ilości 10.
