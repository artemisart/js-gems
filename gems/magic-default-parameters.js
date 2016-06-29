// Allows objects as default parameters, and merge the default obj with the one the user provides

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

    // do what you want here...
    return myParam
}

// Here only `theAnswer` property is changed

extendedDefault({
    theAnswer: 42
})

// But without that gem, the default parameter would be completely replaced

function es2015default(p = { a: 1, b: 2 }) { return p }
es2015default({a: 'b ! where are you ?'})
