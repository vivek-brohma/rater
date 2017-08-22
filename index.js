#! /usr/bin/env node

const argv = process.argv;
const spawn = require('child_process').spawn;
const fs = require('fs');

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

if (argv.indexOf('start') > -1 || argv.indexOf('run') > -1) {
	const onlyOnce = argv.indexOf('run') > -1;

	console.log(__dirname + `/server.js`);
	try {
		// spawn(
		//	`${__dirname}/server.js${onlyOnce ? ' --once' : ''} &`,
		//	(err) => {
		//		console.log(err);
		//	}
		//)
		//	.on('error', err => {
		//		console.log("SP_ERROR", err);
		//	});
		spawn(
			"node",
			["server.js"],
			{
				stdio: ['ignore', out, err],
				detach: true
			}
		).unref();;
	} catch (e) {
		console.log('[ERROR]', e);
	}
} else  if (argv.indexOf('stop') > -1) {
	require('./stop');
} else {
	console.log('Invalid argument provided.\n\n"start": start the polling\n"run": force a poll\n"stop": kill the process');
}
