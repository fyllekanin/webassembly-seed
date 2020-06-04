import { WebAssemblyUtils } from './common/wasm-loader.module.js';

async function runDoubler(value) {
    const doublerWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/doubler.wasm');
    console.log(`Double ${value} is equal to: `, doublerWasm.doubler(value));
}

async function runAdd(first, second) {
    const addWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/add.wasm');
    console.log(`Adding ${first} and ${second} is equal to: `, addWasm.add(first, second));
}

async function runReverse(array) {
    for (let i = 0; i < array.length; ++i) {
        WebAssemblyUtils.getHeap()[i] = array[i];
    }
    const reverseWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/reverse.wasm');
    reverseWasm.reverse(0, array.length);

    const result = [];
    for (let i = 0; i < array.length; ++i) {
        result.push(WebAssemblyUtils.getHeap()[i]);
    }
    console.log(array, 'is now reversed to', result);
}

async function runPassOn(val) {
    const passOn = await WebAssemblyUtils.getWasmExports('./assets/webassembly/passOn.wasm');
    console.log(passOn.callJS(val));
}

window.runReverse = arr => runReverse(arr);
window.runAdd = (first, second) => runAdd(first, second);
window.runDoubler = value => runDoubler(value);
window.runPassOn = value => runPassOn(value);