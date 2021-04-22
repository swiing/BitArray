
ts-node and esm (type=module in package.json) do not fit well together
(see https://github.com/TypeStrong/ts-node/issues/935).

For now, work-around is:
```bash
$ node --loader ts-node/esm test/index.ts
```

instead of
```bash
$ ts-node test/index.ts
```
