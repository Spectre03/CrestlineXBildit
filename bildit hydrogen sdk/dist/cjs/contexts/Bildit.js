"use client";
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

var reactCore = require('@bildit-platform/react-core');
var hydrogenDependencies = require('../constants/hydrogenDependencies.js');
var ImageBanner = require('../components/ImageBanner.js');
var hydrogenRoute = require('../adapters/hydrogenRoute.js');

const BilditProvider = reactCore.createBilditProvider({
    useRoute: hydrogenRoute.useHydrogenRoute,
    ImageBanner: ImageBanner.default,
    coreDependenciesConfig: hydrogenDependencies.hydrogenDependenciesConfig,
});

Object.defineProperty(exports, 'BilditContext', {
    enumerable: true,
    get: function () { return reactCore.BilditContext; }
});
Object.defineProperty(exports, 'useContentComponents', {
    enumerable: true,
    get: function () { return reactCore.useContentComponents; }
});
Object.defineProperty(exports, 'useSlotComponents', {
    enumerable: true,
    get: function () { return reactCore.useSlotComponents; }
});
exports.BilditProvider = BilditProvider;
