/* tslint:disable */
import * as wasm from './hamlet_music_msa_bg';
import { convenient_post } from './convenient_fetch';

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_log_510f182908fba887(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    console.log(varg0);
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

export function __wbg_static_accessor_document_8273e19e35115162() {
    return addHeapObject(document);
}

function getObject(idx) { return heap[idx]; }

export function __wbg_createElement_3cc9bf25e207d812(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(getObject(arg0).createElement(varg1));
}

export function __wbg_body_244cedd79aa5a9be(arg0) {
    return addHeapObject(getObject(arg0).body);
}

export function __wbg_setinnerhtml_3a255b52b1146b3b(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    getObject(arg0).innerHTML = varg1;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

export function __wbg_appendChild_d1b9c9c0fe6ec8fb(arg0, arg1) {
    getObject(arg0).appendChild(takeObject(arg1));
}

export function __wbg_addEventListener_8d50545ab956d920(arg0, arg1, arg2, arg3) {
    let varg1 = getStringFromWasm(arg1, arg2);
    getObject(arg0).addEventListener(varg1, getObject(arg3));
}

export function __wbg_convenientpost_e1c87caea52cf54b(arg0, arg1, arg2, arg3, arg4, arg5) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);

    varg2 = varg2.slice();
    wasm.__wbindgen_free(arg2, arg3 * 1);

    convenient_post(varg0, varg2, getObject(arg4), getObject(arg5));
}
/**
* @returns {void}
*/
export function run() {
    return wasm.run();
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

export const __wbindgen_cb_forget = dropObject;

export function __wbindgen_closure_wrapper135(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(53);
    const d = wasm.__wbg_function_table.get(51);
    const cb = function() {
        this.cnt++;
        try {
            return f(this.a, b);

        } finally {
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}

export function __wbindgen_closure_wrapper136(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(50);
    const d = wasm.__wbg_function_table.get(51);
    const cb = function(arg0) {
        this.cnt++;
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        try {
            return f(this.a, b, ptr0, len0);

        } finally {
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

