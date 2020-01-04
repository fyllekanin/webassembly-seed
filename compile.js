const fs = require('fs');
const { exec } = require('child_process');

/**
 * Compile command
 * emcc [<file>] -Os -s WASM=1 -s SIDE_MODULE=1 -o [<output>]
 */

 /** Files to compile */
 const emccBinary = '~/temp/emsdk/emscripten/incoming/emcc';
 const wasmAssetFolder = 'src/assets/webassembly/';
 const files = [
     'add.c',
     'doubler.c',
     'reverse.c'
 ];

function doesFileExist(file) {
    try {
        if (fs.existsSync(`./webassembly/${file}`)) {
            return true;
        }
    } catch (e) {}
    return false;
}

files.forEach(file => {
    if (!doesFileExist(file)) {
        throw new Error(`${file} does not exist`);
    }
});

for (const file of files) {
    const forCompilation = `./webassembly/${file}`;
    const landing = `${wasmAssetFolder}${file.split('.')[0]}.wasm`;
    const command = `${emccBinary} ${forCompilation} -Os -s WASM=1 -s SIDE_MODULE=1 -o ${landing}`;

    exec(`${command}`, (err, stdout, stderr) => {
        if (err) {
            throw new Error(err);
        }
    
        console.log(`${file} done`);
    });
}
