class HashTable {
	constructor() {
		this.table = new Array(127); // All key value pairs will be stored here
		this.size = 0;
	}
	_hash(key) {
		// Simple has would be to sum the ASCII code of the characters in the key
		let hash = 0;

		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}

		// Since the hash table has 127 slots, hash needs to be within 0 to 127
		return hash % this.table.length;
	}

	set(key, value) {
		const index = this._hash(key); // Calls the hash value to get the index

		// In order to prevent collision, another array is used which stores the [key, value] array pair
		// If there is a similar key, the [key, value] pair will be pushed in the array in the specified index

		// If the key already exists, the value needs to be replaced
		if (this.table[index]) {
			// Loop through the array and check for matching keys in the [key, value] pair
			for (let i = 0; i < this.table[index].length; i++) {
				// If the key exists, change the value
				if (this.table[index][i][0] === key) {
					this.table[index][i][1] = value;
					return;
				}
			}
		} else {
			// If the key doesn't exist, the key, value pair is put inside another array and pushed in the table
			this.table[index] = [[key, value]];
			this.size++;
		}
	}

	get(key) {
		const index = this._hash(key);

		if (!this.table[index]) {
			return null;
		}

		for (let i = 0; i < this.table[index].length; i++) {
			if (this.table[index][i][0] === key) {
				return this.table[index][i][1];
			}
		}

		// Alternative search method
		// return this.table[index].find(item => item[0] === key)
	}

	remove(key) {
		const index = this._hash(key);

		for (let i = 0; i < this.table[index].length; i++) {
			if (this.table[index][i][0] === key) {
				this.table[index].splice(i, 1);
				this.size--;
			}
		}
	}

	print() {
		// Looping over the array
		for (let i = 0; i < this.table.length; i++) {
			// Checking if the index is not empty
			if (this.table[i] && this.table[i].length > 0) {
				console.log(this.table[i][0]);
			}
		}
	}
}

const table = new HashTable();

table.set("firstName", "John");
table.set("lastName", "Doe");
table.set("age", 25);
table.set("address", "221b Baker Street");
table.remove("age");

table.print();
