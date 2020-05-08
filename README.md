# Option monad for Typescript
Yet another port of the Scala Option type to TypeScript.

![](https://github.com/sdedovic/option-ts/workflows/Node.js%20Package/badge.svg)
![npm (tag)](https://img.shields.io/npm/v/option-monad-ts/latest)

```bash
npm i --save option-monad-ts
```

## Usage
### Basic Example

```typescript
import { Option, Some, None } from 'option-monad-ts';

// Create Some 
let n = new Some(3);
let m = Some.of('four');

// Create Option
let c = Option.of(3);
let d = Option.of(null);

// Validate and use
n.get();                    // 3
m.get();                    // 'four'

c.isDefined();              // true
d.isDefined();              // false

Some.of(4)
    .map(_ => _.toString())
    .forEach(_ => console.log(_))
```

## Documentation
### `Option<T>`
#### *static* `of<T>(x: T): Option<T>`
An Option factory which creates Some.of(x) if the argument is not null, and None if it is null.
#### `filter(p: (i: T) => boolean): Option<T>`
Returns this Option if it is nonempty and applying the predicate p to this Option's value returns true. Otherwise, return None.
#### `flatMap<R>(f: (i: T) => Option<R>): Option<R>`
Returns the result of applying f to this Option's value if this Option is nonempty. Returns None if this Option is empty. Slightly different from map in that f is expected to return an Option (which could be None).
#### `forEach<U>(f: (i: T) => U): void`
Apply the given procedure f to the option's value, if it is nonempty. Otherwise, do nothing.
#### `get(): T`
Returns the option's value. The option must be nonEmpty.
#### `getOrElse(defaultValue: T): T`
Returns the option's value if the option is nonempty, otherwise return defaultValue.
#### `isDefined(): boolean`
Returns true if the option is an instance of Some, false otherwise.
#### `isEmpty(): boolean`
Returns true if the option is None, false otherwise.
#### `map<R>(f: (i: T) => R): Option<R>`
Returns a Some containing the result of applying f to this Option's value if this Option is nonempty. Otherwise, return None.

### Why another library?
- I thought it would be a good exercise
- I didn't like the API/usage patterns of some existing libraries
- I wanted something as close to the Scala lib as possible, so I ported it trying to keep to its spirit
