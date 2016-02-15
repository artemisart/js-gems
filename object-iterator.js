// Allows iterating on objects

Object.prototype[Symbol.iterator] = function* () {
	for (let key of Object.keys(this)) {
		yield [key, this[key]]
	}
}

// Example
// Iterating works with 'for ... of'

let data = {
	a: 42,
	hello: "world"
}

for (let [key, value] of data)
	console.log(key, value)

// Example
// And also with the spread operator

console.log([...data])