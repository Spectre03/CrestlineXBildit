/*
   * Copyright (c) 2022 BILDIT, INC.
   *
   * This file, and the software contained herein, are the exclusive property of BILDIT, INC.
   * Unauthorized copying, distribution, or modification of this software is strictly prohibited.
   * All rights reserved.
   *
   * This file is licensed under the ENT License ("License"). Use of this file is subject to the
   * terms and conditions specified in the License. You may obtain a copy of the License at:
   *
   *     https://bildit.co/ENTLicense
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
   * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
   * DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
   * OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMClient = require('react-dom/client');
var JsxDevRuntime = require('react/jsx-dev-runtime');
var JsxRuntime = require('react/jsx-runtime');
var ReactRouter = require('react-router');
var Hydrogen = require('@shopify/hydrogen');
var reactCore = require('@bildit-platform/react-core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);
var ReactDOMClient__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOMClient);
var JsxDevRuntime__namespace = /*#__PURE__*/_interopNamespaceDefault(JsxDevRuntime);
var JsxRuntime__namespace = /*#__PURE__*/_interopNamespaceDefault(JsxRuntime);
var ReactRouter__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactRouter);
var Hydrogen__namespace = /*#__PURE__*/_interopNamespaceDefault(Hydrogen);

/** Module map for @bildit-platform/engine banner interpretation (Hydrogen-native, no next/*). */
const hydrogenDependenciesConfig = {
    react: { module: React__namespace },
    'react/jsx-runtime': { module: JsxRuntime__namespace },
    'react/jsx-dev-runtime': { module: JsxDevRuntime__namespace },
    'react-dom': { module: ReactDOM__namespace },
    'react-dom/client': { module: ReactDOMClient__namespace },
    'react-router': { module: ReactRouter__namespace },
    '@shopify/hydrogen': { module: Hydrogen__namespace },
};

Object.defineProperty(exports, 'compiledLanguages', {
    enumerable: true,
    get: function () { return reactCore.compiledLanguages; }
});
Object.defineProperty(exports, 'staticLanguages', {
    enumerable: true,
    get: function () { return reactCore.staticLanguages; }
});
Object.defineProperty(exports, 'supportedLanguages', {
    enumerable: true,
    get: function () { return reactCore.supportedLanguages; }
});
exports.hydrogenDependenciesConfig = hydrogenDependenciesConfig;
