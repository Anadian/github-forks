#!/usr/local/bin/node

/**
* @file github-forks.js
* @brief Gets the 'lastest commit' of every fork listed in a GitHub repo's forks page.
* @author Anadian
* @copyright 	Copyright 2019 Canosw
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
/**
* @fn Async_Request
* @brief Asynchronous use of request module.
* @async true
* @param url
*	@type String
*	@brief The URL to be http-get'd.
*	@default null
* @return <ARRAY>
*	@entry 0 
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
async function Async_Request( url ){
	var _return = [1,null];
	const FUNCTION_NAME = 'Async_Request';
	//Variables
	var function_return = null;

	//Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','received: '+arguments.toString());
	//Parametre checks
	if(url == undefined) url = null;
	
	//Function
	if( url !== null ){
		try{
			function_return = await RequestPromiseNative(url);
			_return = [0, function_return];
		} catch(error){
			function_return = error;
			_return = [-3, function_return];
		}
	}
	//Return
	//Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','returned: '+_return.toString());
	return _return;
}
/**
* @fn ForkArray_Requests_Async
* @brief Request pages from the fork urls in the array.
* @async true
* @param input_array
*	@type Array
*	@brief The array to be parsed and processed.
*	@default 
* @return <ARRAY>
*	@entry 0 
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
async function ForkArray_Requests_Async( input_array ){
	var _return = [1,null];
	const FUNCTION_NAME = 'ForkArray_Requests_Async';
	//Variables
	var f\r = null;

	//Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','received: '+arguments.toString());
	//Parametre checks
	if(input_array == undefined) input_array = null;
	
	//Function
	if( Array.isArray(input_array) === true ){
		for(var i = 0; i < input_array.length; i++){
			console.log("%d: %s", i, input_array[i]);
			var matches = input_array[i].match(/<a href="([^"]*)">/);
			var repo = matches[1].split('/');
			var graphql_querystring = '{query{repository(name:"'+repo[1]+'",owner:"'+repo[0]+'"){ createdAt pushedAt updatedAt } } }';
			var request_options = {
				uri: '',
				baseURL: 'https://api.github.com/graphql',
				method: 'POST',
				followOriginalHttpMethod: true,
				body: graphql_querystring 
			};
			try{
				f\r = await RequestPromiseNative( request_options );
			} catch(error){
			}
			if( f\r[0] === 0 ){ //Request success
			} else{ //Request failed.
			}
		}
	} else{ //input_array not an array.
	
	}
	//Return
	//Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','returned: '+_return.toString());
	return _return;
}


//Exports and Execution
if(require.main === module){
	var file_data = FileSystem.readFileSync('node-twitter_forks.html', 'utf8');
	var repo_array = file_data.match(/<div class="repo">(.*?)<\/div>/gms);
	ForkArray_Requests_Async( repo_array );
} else{
	
}
