// LINQ-like select many

function* selectMany(iterable, callback, thisArg) {
	let index = 0
	for (let value of iterable)
		yield* callback.call(thisArg, value, index++, iterable)
}