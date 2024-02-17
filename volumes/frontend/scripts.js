/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/form.factory.ts":
/*!***************************************!*\
  !*** ./src/factories/form.factory.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.armForm = exports.submit = exports.parseFormData = void 0;
const preview_factory_1 = __webpack_require__(/*! ./preview.factory */ "./src/factories/preview.factory.ts");
const parseFormData = (formData) => {
    let object = {};
    formData.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        if (!Reflect.has(object, key)) {
            object[key] = value;
            return;
        }
        if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
        }
        object[key].push(value);
    });
    return object;
};
exports.parseFormData = parseFormData;
const submit = (e, id) => {
    const formData = (0, exports.parseFormData)(e.formData);
    console.log(JSON.parse(formData.raw_eas));
    fetch('http://localhost:3009/create', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: formData.raw_eas
    })
        .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (result) {
        console.log(result);
        (0, preview_factory_1.preview)(result.image);
    })
        .catch(function (error) {
        console.log('Request failed', error);
    });
};
exports.submit = submit;
const armForm = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const el = document.querySelector('form');
        let self = this;
        const onSubmit = (e) => {
            e.preventDefault();
            new FormData(el);
        };
        el.addEventListener("submit", onSubmit);
        el.addEventListener("formdata", (cc) => __awaiter(void 0, void 0, void 0, function* () {
            resolve((0, exports.submit)(cc, el.id));
        }));
    });
});
exports.armForm = armForm;


/***/ }),

/***/ "./src/factories/preview.factory.ts":
/*!******************************************!*\
  !*** ./src/factories/preview.factory.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.preview = void 0;
const preview = (image) => {
    const container = document.getElementById("preview_container");
    container.innerHTML = "";
    const a = document.createElement("article");
    a.style.width = "100%";
    a.style.height = "auto";
    a.style.position = "relative";
    const img = document.createElement("img");
    img.src = "http://localhost:8880/frames/" + image;
    img.style.width = "100%";
    img.style.height = "auto";
    a.appendChild(img);
    container.appendChild(a);
};
exports.preview = preview;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const form_factory_1 = __webpack_require__(/*! ./factories/form.factory */ "./src/factories/form.factory.ts");
(0, form_factory_1.armForm)();

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!***************************!*\
  !*** ./styling/main.scss ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map