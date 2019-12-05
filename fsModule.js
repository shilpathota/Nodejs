/** 
 * fs provides functionalities required to work with file systems
 * 
 * All file system operations have synchronous and asynchronous forms.
 * 
 * The asynchronous form always takes a completion callback as its last argument. The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception. If the operation was completed successfully, then the first argument will be null or undefined.
 * 
 * Exceptions that occur using synchronous operations are thrown immediately and may be handled using try…catch, or may be allowed to bubble up.
 * 
 * In busy processes, use the asynchronous versions of these calls. The synchronous versions will block the entire process until they complete, halting all connections.
 * 
 * */

const fs = require('fs')

const file = 'package.json';
/**
 * fs.access
 * 
 * F_OK - Check if the file exists in the current directory.W_OK - checks if the file is writable. R_OK - checks if the file is readable
 * 
 */
fs.access(file, fs.constants.F_OK|fs.constants.W_OK | fs.constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

//Output: package.json exists (if package.json is available)

/**
 * Relative paths will be resolved relative to the current working directory as specified by process.cwd()
 */
fs.open('write.txt', 'r', (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });

  /**
   * Absolute Path usage
   */

  fs.open('/shilpathota/nodejs/file.txt', 'r', (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });

  /**
   * URL is also supported
   */
  const fileUrl = new URL('file:///tmp/hello');
  fs.readFileSync(fileUrl);
//reads the file contents synchronously

/**
 * File Descriptors:
 * 
 * for every process, the kernel maintains a table of currently open files and resources. Each open file is assigned a simple numeric identifier called a file descriptor. At the system-level, all file system operations use these file descriptors to identify and track each specific file. 
 * 
 * The fs.open() method is used to allocate a new file descriptor. Once allocated, the file descriptor may be used to read data from, write data to, or request information about the file.
 * 
 * Most operating systems limit the number of file descriptors that may be open at any given time so it is critical to close the descriptor when operations are completed. Failure to do so will result in a memory leak that will eventually cause an application to crash.
 */

 
fs.open('/shilpathota/nodejs/file.txt', 'r', (err, fd) => {
    if (err) throw err;
    fs.fstat(fd, (err, stat) => {
      if (err) throw err;
      // use stat
  
      // always close the file descriptor!
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });
  }); 


/**
 * fs.Dir --> represents a directory stream.
 * fs.stats --> provides info about the file
 * fs.dirent --> represents dir entry as returned by fs.Dir
 * fs.FSWatcher --> All fs.FSWatcher objects emit a 'change' event whenever a specific watched file is modified.
 */

fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
      console.log(filename);
    }
  });

  /**
   * fs.readStream  -->  A successful call to fs.createReadStream() will return a new fs.ReadStream object.
   * fs.appendFile  --> appends value to the file existing
   * 
   */
  fs.open('write.txt', 'a', (err, fd) => {
    if (err) throw err;
    fs.appendFile(fd, 'data to append', 'utf8', (err) => {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      if (err) throw err;
    });
  });

  /**
   * fs.chmod() -->  Asynchronously changes the permissions of a file.
   * 
fs.constants.S_IRUSR	0o400	read by owner
fs.constants.S_IWUSR	0o200	write by owner
fs.constants.S_IXUSR	0o100	execute/search by owner
fs.constants.S_IRGRP	0o40	read by group
fs.constants.S_IWGRP	0o20	write by group
fs.constants.S_IXGRP	0o10	execute/search by group
fs.constants.S_IROTH	0o4	    read by others
fs.constants.S_IWOTH	0o2	    write by others
fs.constants.S_IXOTH	0o1	    execute/search by others
* fs.chown() -->  Asynchronously changes owner and group of a file. 
* fs.close()  -->  Asynchronous close
* fs.constants  -->  Returns an object containing commonly used constants for file system operations. 
   */
  fs.chmod('my_file.txt', 0o775, (err) => {
    if (err) throw err;
    console.log('The permissions for file "my_file.txt" have been changed!');
  });

/**
 * fs.copyFile  -->  Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
 * 
 * flags is an optional integer that specifies the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE).

fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists.
fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
 */

fs.copyFile('source.txt', 'destination.txt', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });

  /**
   * fs.createReadStream() 
   * By default, the stream will not emit a 'close' event after it has been destroyed. This is the opposite of the default for other Readable streams. Set the emitClose option to true to change this behavior. 
   */

  const stream = fs.createReadStream('/dev/input/event0');
  //read the last 10 bytes of a file which is 100 bytes long
  fs.createReadStream('sample.txt', { start: 90, end: 99 });
  setTimeout(() => {
    stream.close(); // This may not close the stream.
    // Artificially marking end-of-stream, as if the underlying resource had
    // indicated end-of-file by itself, allows the stream to close.
    // This does not cancel pending read operations, and if there is such an
    // operation, the process may still not be able to exit successfully
    // until it finishes.
    stream.push(null);
    stream.read(0);
  }, 100);
  /** 
   * fs.readdir --> asynchronously read the contents of directory
   * fs.read -->  asynchronously read the contents of file with specific number of bytes read by file descriptor
   * fs.readFile  --> Asynchronously reads the entire contents of a file
   * fs.rename  -->  Asynchronously rename file at oldPath to the pathname provided as newPath. In the case that newPath already exists, it will be overwritten. If there is a directory at newPath, an error will be raised instead
   * 
  */

 fs.rename('oldFile.txt', 'newFile.txt', (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  });

  /**
   * fs.unlink  -->  Asynchronously removes a file or symbolic link
   */
  fs.unlink('file.txt', (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
  /**
   * fs.unwatchFile(filename[, listener]) --> Stop watching for changes on filename. If listener is specified, only that particular listener is removed. Otherwise, all listeners are removed, effectively stopping watching of filename
   * fs.watch  -->  Watch for changes on filename, where filename is either a file or a directory
   * 
   */

  fs.watch('somedir', (eventType, filename) => {
    console.log(`event type is: ${eventType}`);
    if (filename) {
      console.log(`filename provided: ${filename}`);
    } else {
      console.log('filename not provided');
    }
  });
/**
 *  fs.writeFile() -->When file is a filename, asynchronously writes data to the file, replacing the file if it already exists. data can be a string or a buffer.

When file is a file descriptor, the behavior is similar to calling fs.write() directly
 *  It is unsafe to use fs.writeFile() multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream() is recommended
 *  The difference from directly calling fs.write() is that under some unusual conditions, fs.write() may write only part of the buffer and will need to be retried to write the remaining data, whereas fs.writeFile() will retry until the data is entirely written (or an error occurs).
 */

  const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

/**
 * filehandle.appendFile  -->  Asynchronously append data to this file, creating the file if it does not yet exist
 * filehandle.chmod  --> modifies the permissions of the file.
 * filehandle.chown  -->  Changes the ownership of the file then resolves the Promise with no arguments upon success
 * filehandle.close()  --> Closes the file descriptor.
 * 
 */
const fsPromises = require('fs').promises;
async function openAndClose() {
  let filehandle;
  try {
    filehandle = await fsPromises.open('thefile.txt', 'r');
  } finally {
    if (filehandle !== undefined)
      await filehandle.close();
  }
}

/**
 * A call to fs.ftruncate() or filehandle.truncate() can be used to reset the file contents
 */