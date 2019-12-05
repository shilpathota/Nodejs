/**
 * npm is an online repository for the publishing of open-source Node. js projects
 * npm is a node package manager which has built in modules and can be imported via require function
 *  it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management
 * 
 * To initialize use command "npm init"
 * then install using "npm install <modulename>"
 * 
 * if you are facing 404 error check for the proxy settings of the system. This might be one of the possible causes
 */

const validator = require('validator')

console.log(validator.isEmail('sdaf@gmail.com'))