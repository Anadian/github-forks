#!/usr/local/bin/node

/**
* @file github-forks.js
* @brief Gets the 'lastest commit' of every fork listed in a GitHub repo's forks page.
* @author Anadian
* @copyright MITlicensetm(2019,Canosw)
*/

//Dependencies
	//Internal
	//Standard
	const FileSystem = require('fs');
	//External
	const RequestPromiseNative = require('request-promise-native');

//Constants
const FILENAME = 'github-forks.js';
const MODULE_NAME = 'GitHubForks';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'github-forks';
} else{
	PROCESS_NAME = process.argv0;
}

//Functions

//Exports and Execution
if(require.main === module){
	var file_data = FileSystem.readFileSync('node-twitter_forks.html', 'utf8');
	var repo_array = file_data.match(/<div class="repo">(.*?)<\/div>/gms);
	var repo_urls = [];
	for(var i = 0; i < repo_array.length; i++){
		console.log("%d: %s", i, repo_array[i]);
		var matches = repo_array[i].match(/<a href="([^"]*)">/);
		var full_url_string = "https://github.com"+matches[1];
		console.log(full_url_string);
	}
} else{
	
}
