const MODULE_CACHE = {};
const memory = new WebAssembly.Memory({
    initial: 256,
    maximum: 256
});
const heap = new Uint8Array(memory.buffer);
const importObj = {
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: memory,
        table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc',
        })
    }
  };

export class WebAssemblyUtils {

    /**
     * Get the instance of a webassembly module by path
     * @param {String} path to the webassembly module
     * @returns Webassembly exports 
     */
    static async getWasmExports(path) {
        const name = WebAssemblyUtils.getFileName(path);
        if (MODULE_CACHE[name]) {
            return MODULE_CACHE[name];
        }

        const fetchPromise = fetch(path);
        const { module, instance } = await WebAssembly.instantiateStreaming(fetchPromise, importObj);

        MODULE_CACHE[name] = instance.exports;
        return instance.exports;
    }

    static getHeap() {
        return heap;
    }

    static getFileName(path) {
        const match = path.match(/[\w-]+\.wasm/gm);
        if (!match || match.length < 1) {
            throw new Error(`"${match} is an invalid name`);
        }
        return match[0];
    }
}
