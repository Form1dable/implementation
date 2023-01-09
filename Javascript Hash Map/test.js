const table = new Array(127);

function _hash(key, length) {
	let hash = 0;

	for (let i = 0; i < key.length; i++) {
		hash += key.charCodeAt(i);
	}

	return [hash, hash % length];
}

console.log(_hash("97", table.length));
