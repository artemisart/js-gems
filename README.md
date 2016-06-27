#js-gems
Because it's awesome...

Gems :
1. magic default parameters
2. object iterator
3. select many
4. select

## Magic default parameters

Allows objects as default parameters, and merge the default obj with the one the user provides
```js
function extendedDefault(
    myParam = {
        theAnswer: 101010,
        hello: 'world',
        awesome: true
    }
) {
	/* extended default parameters */ {
		if (!arguments.length)
            return myParam
		let defaultParam = extendedDefault()
        for (let opt in defaultParam)
            if (myParam[opt] === undefined)
                myParam[opt] = defaultParam[opt]	
    }

    /* do what you want here... */
    return myParam
}
```

- Here only `theAnswer` property is changed
```js
extendedDefault({
    theAnswer: 42
})
```
```js
> { theAnswer: 42, hello: 'world', awesome: true }
```

- But without that gem, the default parameter would be completely replaced
```js
function es2015default(p = { a: 1, b: 2 }) { return p }
es2015default({a: 'b ! where are you ?'})
```
```js
> { a: 'b ! where are you ?' }
```

## Object iterator

Allows iterating on objects
```js
Object.prototype[Symbol.iterator] = function* () {
	for (let key of Object.keys(this)) {
		yield [key, this[key]]
	}
}
```

- Iterating works with 'for ... of'
```js
let data = {
	a: 42,
	hello: "world"
}

for (let [key, value] of data)
	console.log(key, value)
```
```
a 42
hello world
```

- And also with the spread operator
```js
[...data]
```
```js
> [ [ 'a', 42 ], [ 'hello', 'world' ] ]
```

## Select many

LINQ-like select many
```js
function* selectMany(iterable, callback, thisArg) {
	let index = 0
	for (let value of iterable)
		yield* callback.call(thisArg, value, index++, iterable)
}
```

## Select

TODO support sparse array
```js
function* select(iterable, callback, thisArg) {
	let index = 0
	for (let value of iterable)
		yield callback.call(thisArg, value, index++, iterable)
}
```
