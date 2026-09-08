# Temat: Typy proste (prymitywne)
`string`
`number`
`boolean`
`Arrays`
`any`

```typescript
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

let myName: string = "Alice";

// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

## Functions
```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```