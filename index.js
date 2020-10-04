#!/usr/bin/env node

const fs = require("fs");

// Method #2
// const util = require("util");
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) {
		console.log(err);
	}

	try {
		const allStats = await Promise.all(filenames.map(lstat));

		allStats.forEach((stats, index) => {
			console.log(filenames[index], stats.isFile());
		});
	} catch (err) {
		console.log(err);
	}
});

// Method #1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) {
// 				reject(err);
// 			}

// 			resolve(stats);
// 		});
// 	});
// };
