function isProduction() {
	return process.env.NODE_ENV === 'production'
}

function createCssClassNameSequence() {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'
	const alphabetLength = alphabet.length
	let index = 1

	function numberToChars(number) {
		let chars = ''

		while (number > 0) {
			let n = (number - 1) % alphabetLength
			chars = alphabet[n] + chars

			number = Math.floor((number - n) / alphabetLength)
		}

		return chars
	}

	return function() {
		const chars = numberToChars(index)
		index++

		return chars
	}
}

const getNextCssClassName = createCssClassNameSequence()

module.exports = {
	displayName: true,
	classNameSlug(hash, title) {
		if (!isProduction()) {
			return title
		}

		return getNextCssClassName()
	}
}
