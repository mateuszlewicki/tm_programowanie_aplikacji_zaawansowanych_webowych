# Typy podstawowe
## Przydatne linki
- https://www.akamai.com/cloud/guides/typescript-types-get-started
- https://kamilmysliwiec.com/typescript-typ-wyliczeniowy-enum
- https://www.freecodecamp.org/news/a-mental-model-to-think-in-typescript-2/
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

## Typy proste (prymitywne)

TypeScript ma 3 typy proste: `number`, `boolean` and `string`, tak samo jak JavaScript.
 
Zgodnie z oficjalną dokumentacją TypeScript: powinniśmy zawsze używać nazw zaczynjące się małą literą jeżeli będziemy używać typów prostych, ponieważ typy `Number`, `Boolean` i `String` są specjalnymi wbudowanymi typami.

`number` - reprezentuje liczby stało i zmienno przecinkowe pod jednym typem

`boolean` - reprezentuje wartość logiczną `true` lub `false`

`string` - reprezentuje text - łańcuch znaków, np. "Tutaj jest przykłądowy tekst"

`any` - typ specjalny, który można użyć, kiedy nie chcemy przypisywać szczególnego typu, który powodowałby błędy przy sprawdzaniu typów. 

### Deklaracja zmiennych 
Możemy zadeklarować zmienne w sposób jawny, z deklaracją typu (explicite):
```typescript
let ciag: string = "Text";
let cyfry: number = 12;
let wartosc: boolean = true;
let dowolny: any = "23" 
```
Oraz możemy również zadeklarować w sposób taki, że kompilator sam domyśli typu (implicite/inferred)

```typescript
let ciag = "Text";
let cyfry = 12;
let wartosc = true;
```


## Enumy / typ wyliczeniowy

W TypeScript mamy również typ znany z większości popularnych języków programowania – typ wyliczeniowy `enum`. Jest to nic więcej, jak zbiór nazwanych, określonych wartości liczbowych (całkowitych).

```typescript
enum Status {
    New, // 0
    InProgress, // 1
    Completed // 2
}

const taskStatus: Status = Status.InProgress;
console.log(taskStatus); // Out: 1

```

## Objekty
obiekty w TypeScript grupują listę własności pod jednym typem.
Obiekty możemy zdefiniować używając słowa kluczowego `type`

```typescript
type User = {
    id: number;
    name: string;
};

const user: User =  { id: 1, name: "Antoni" };
```

albo `interface`

```typescript
interface Person {
    name: string;
    age: number;
};

const person: Person =  { name: "Antoni", age: 30 };
```

Interfejsy są rozszerzalne i mogą dziedziczyć po innych interfejsach. Możesz je rozszerzać, deklarując ten sam interfejs wielokrotnie lub używając słowa kluczowego `extends`. 

Klasy mogą implementować interfejsy.


Alias typu (`type`) w języku TypeScript może być używany do definiowania typów dla różnorodnych struktur, nie tylko obiektów. Obejmuje to typy proste (prymitywy), unie, iloczyny typów (intersections), krotki i wiele innych. 

Choć `type` daje większą elastyczność przy definiowaniu złożonych typów, <u>nie można</u> go ponownie utworzyć, aby go rozszerzyć lub dodać nowe właściwości.

To, czy użyć `type`, czy `interface`, zależy od konkretnych potrzeb projektu oraz od preferencji osobistych lub zespołowych.

### Funkcje

TypeScript rozszeża działanie funkcji, umożliwiając programistom określanie typów dla parametrów oraz zwracanych wartości. 

Zapewnia, że funkcje są wywoływane z odpowiednimi typami argumentów, a zwracane przez nie typy są zgodne z oczekiwaniami.

```typescript
function sayHello(name: string): string {
    return `Hello, ${name}!`;
}

const message: string = sayHello("Antoni");
```


### Tablica

Tablice w języku TypeScript pozwalają na przechowywanie wielu wartości tego samego typu.
TypeScript umożliwia tworzenie tablic dla typów prostych (prymitywów) oraz obiektowych.

```typescript
let tablica: string[] = ["a","b","c"];

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Antoni", "Jacek", "Mikołaj"];

type User = {
    id: number;
    name: string;
};

const users: User[] = [
    { id: 1, name: "Antoni" },
    { id: 2, name: "Jacek" },
];

```

Ponadto możesz użyć generycznego typu tablicowego Array<elementType> do tworzenia tablic:

```typescript
const scores: Array<number> = [1, 2, 3, 4, 5];
const cities: Array<string> = ["Bydgoszcz","Warsaw","London", "New York", "Kyiv"];
```