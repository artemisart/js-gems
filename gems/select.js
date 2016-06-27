// TODO support sparse array

function* select(iterable, callback, thisArg) {
	let index = 0
	for (let value of iterable)
		yield callback.call(thisArg, value, index++, iterable)
}