#! /usr/bin/env node

const INTERVAL = 30 * 60 * 1000;
const fetch = require('node-fetch');
const notifier = require('node-notifier');
const exec = require('child_process').exec;
const isOnce = process.argv.indexOf('--once') > -1;

function getDetail() {
    return fetch(`http://api.fixer.io/latest`)
        .then(resp => resp.json())
        .catch(err => exec(`echo "${new Date().toString()} => ${err.message}" >> errors`));
}

function showNotification(resp) {
    const rate = resp && resp.rates && resp.rates.INR;

    if (!rate) {
        setTimeout(notifyRates, INTERVAL);
        return;
    }

    notifier.notify(`1 EUR = ${rate} INR`);

    if (!isOnce) {
        setTimeout(notifyRates, INTERVAL);
    }
}

function notifyRates() {
    getDetail()
        .then(showNotification);
}

function run() {
    const pid = require('process').pid;

    try {
    	const fs = require('filesystem');
    	const pid = +fs.readFileSync('./pid');

    	if (!isNaN(pid)) {
    		exec(`kill ${pid}`);
	    }
    } catch (e) {}

    exec(`echo "${pid}" > pid`, (err, stdout, stderr) => {
        console.log("Written file with:");
        console.log("Err", err);
        console.log("Std:out", stdout);
        console.log("Std:err", stderr, '\n\n');
    });

    notifyRates();
}

run();
