#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const { lstat } = fs.promises;

const [, , targetDir = process.cwd()] = process.argv;

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}

	try {
		const statsPromises = filenames.map((filename) => {
			return lstat(path.join(targetDir, filename));
		});

		const allStats = await Promise.all(statsPromises);

		allStats.forEach((stats, index) => {
			if (stats.isFile()) {
				console.log(filenames[index]);
			} else {
				console.log(chalk.bold(filenames[index]));
			}
		});
	} catch (err) {
		console.log(err);
	}
});
