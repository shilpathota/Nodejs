/**
 * process.argv[0] -> returns nodejs executabe file location in the system
 * process.argv[1] -> returns the folder location of the file
 * process.argv[2] -> returns the command given in the terminal
 */

const command = process.argv[2]

if(command == 'add')
    console.log('adding the node')
else if(command == 'remove')
    console.log('removing the node')

/**
 * yargs library in node.js ::: builds interactive command line tools, by parsing arguments and generating an elegant user interface.
 * _-> populates when the value from args is given
 * $0 -> name of the file
 */

const yargs = require('yargs')
console.log(yargs.argv)

/**
 * if the input from args is given as follows:
 * node usingcmdlineArgs.js add --title = "Things to add"
 * yargs.argv -> { _: ['add'], title:'Things to add','$0':'usingcmdlineArgs.js'
 **/

/**
 * Customize yargs
 */
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Adds the new node',
    handler: function() {
        console.log('Adding new node')
    }
})

//Create remove command
yargs.command({
    command:'remove',
    describe: ' remove the new node',
    handler: function(){
        console.log('Removing the node')
    }
})

//Create list command
yargs.command({
    command:'list',
    describe: ' listing out nodes',
    handler: function(){
        console.log('listing out nodes')
    }
})
