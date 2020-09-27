#!/usr/bin/env node

const fs = require("fs");

// The process module is automatically added into the global scope
fs.readdir(process.cwd(), (err, filenames) => {
	if (err) {
		console.log(err);
	}

	console.log(filenames);
});
