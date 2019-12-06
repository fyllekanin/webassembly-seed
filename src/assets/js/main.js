import { WebAssemblyUtils } from './common/wasm-loader.module.js';

async function runDoubler() {
    const doublerWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/doubler.wasm');
    console.log(doublerWasm.doubler(5));
}

async function runAdd() {
    const addWasm = await WebAssemblyUtils.getWasmExports('./assets/webassembly/add.wasm');
    console.log(addWasm.add(2, 3));
}

runDoubler();
runAdd();