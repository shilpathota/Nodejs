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