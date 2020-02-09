import { WebAssemblyUtils } from './common/wasm-loader.module.js';

async function runDoubler() {
    const doublerWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/doubler.wasm');
    console.log(doublerWasm.doubler(5));
}

async function runAdd() {
    const addWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/add.wasm');
    console.log(addWasm.add(2, 3));
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
    console.log(array, 'is now reverse to', result);
}

async function runPassOn(val) {
    const passOn = await WebAssemblyUtils.getWasmExports('./assets/webassembly/passOn.wasm');
    console.log(passOn.callJS(val));
}

runDoubler();
runAdd();
runReverse([1,2,3]);
runPassOn(50);