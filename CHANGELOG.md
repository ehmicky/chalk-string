# 4.0.0

## Breaking changes

- The [main method](README.md#chalkstringstyles-options) has been split into two
  stages. This improves performances.

```diff
import chalkString from 'chalk-string'

- // Before:
- chalkString('red', 'input')
+ // Now:
+ chalkString('red')('input')
```

# 3.0.1

## Documentation

- Improve documentation in `README.md`

# 3.0.0

## Breaking changes

- Minimal supported Node.js version is now `18.18.0`

# 2.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 1.2.0

## Features

- Improve tree-shaking support

# 1.1.0

## Features

- Improve validation

# 1.0.1

## Bug fixes

- Fix types documentation

# 1.0.0

Initial release.
