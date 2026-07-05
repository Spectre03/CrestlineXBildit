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
var Bildit = require('./contexts/Bildit.js');
var hydrogenDependencies = require('./constants/hydrogenDependencies.js');
var hydrogenRoute = require('./adapters/hydrogenRoute.js');
var ImageBanner = require('./components/ImageBanner.js');
var BilditAdminBridge = require('./vee/BilditAdminBridge.js');
var BilditRoot = require('./vee/BilditRoot.js');
var ensureHostReactGlobals = require('./vee/ensureHostReactGlobals.js');
var registerCmsDependencies = require('./vee/registerCmsDependencies.js');



Object.defineProperty(exports, 'BilditClient', {
	enumerable: true,
	get: function () { return reactCore.BilditClient; }
});
Object.defineProperty(exports, 'BilditContext', {
	enumerable: true,
	get: function () { return reactCore.BilditContext; }
});
Object.defineProperty(exports, 'ContentPlaceholder', {
	enumerable: true,
	get: function () { return reactCore.ContentPlaceholder; }
});
Object.defineProperty(exports, 'PREVIEW_CONSTANTS', {
	enumerable: true,
	get: function () { return reactCore.PREVIEW_CONSTANTS; }
});
Object.defineProperty(exports, 'REMOTE_PROPS_UPDATED', {
	enumerable: true,
	get: function () { return reactCore.REMOTE_PROPS_UPDATED; }
});
Object.defineProperty(exports, 'SlotPlaceholder', {
	enumerable: true,
	get: function () { return reactCore.SlotPlaceholder; }
});
Object.defineProperty(exports, 'StyleBoundary', {
	enumerable: true,
	get: function () { return reactCore.StyleBoundary; }
});
Object.defineProperty(exports, 'StylePlaceholder', {
	enumerable: true,
	get: function () { return reactCore.StylePlaceholder; }
});
Object.defineProperty(exports, 'compiledLanguages', {
	enumerable: true,
	get: function () { return reactCore.compiledLanguages; }
});
Object.defineProperty(exports, 'convertToEpoch', {
	enumerable: true,
	get: function () { return reactCore.convertToEpoch; }
});
Object.defineProperty(exports, 'createPreviewHeaders', {
	enumerable: true,
	get: function () { return reactCore.createPreviewHeaders; }
});
Object.defineProperty(exports, 'createPreviewHeadersFromContext', {
	enumerable: true,
	get: function () { return reactCore.createPreviewHeadersFromContext; }
});
Object.defineProperty(exports, 'getPreviewContextFromHeaders', {
	enumerable: true,
	get: function () { return reactCore.getPreviewContextFromHeaders; }
});
Object.defineProperty(exports, 'getPreviewContextFromUrl', {
	enumerable: true,
	get: function () { return reactCore.getPreviewContextFromUrl; }
});
Object.defineProperty(exports, 'getPreviewDateFromHeaders', {
	enumerable: true,
	get: function () { return reactCore.getPreviewDateFromHeaders; }
});
Object.defineProperty(exports, 'getPreviewDateFromUrl', {
	enumerable: true,
	get: function () { return reactCore.getPreviewDateFromUrl; }
});
Object.defineProperty(exports, 'getRemoteProps', {
	enumerable: true,
	get: function () { return reactCore.getRemoteProps; }
});
Object.defineProperty(exports, 'processPreviewContext', {
	enumerable: true,
	get: function () { return reactCore.processPreviewContext; }
});
Object.defineProperty(exports, 'staticLanguages', {
	enumerable: true,
	get: function () { return reactCore.staticLanguages; }
});
Object.defineProperty(exports, 'supportedLanguages', {
	enumerable: true,
	get: function () { return reactCore.supportedLanguages; }
});
Object.defineProperty(exports, 'useContentComponents', {
	enumerable: true,
	get: function () { return reactCore.useContentComponents; }
});
Object.defineProperty(exports, 'useSlotComponents', {
	enumerable: true,
	get: function () { return reactCore.useSlotComponents; }
});
Object.defineProperty(exports, 'validatePreviewContext', {
	enumerable: true,
	get: function () { return reactCore.validatePreviewContext; }
});
exports.BilditProvider = Bildit.BilditProvider;
exports.hydrogenDependenciesConfig = hydrogenDependencies.hydrogenDependenciesConfig;
exports.useHydrogenRoute = hydrogenRoute.useHydrogenRoute;
exports.ImageBanner = ImageBanner.default;
exports.BilditAdminBridge = BilditAdminBridge.BilditAdminBridge;
exports.DEFAULT_ADMIN_SCRIPT = BilditAdminBridge.DEFAULT_ADMIN_SCRIPT;
exports.BilditRoot = BilditRoot.BilditRoot;
exports.ensureHostReactGlobals = ensureHostReactGlobals.ensureHostReactGlobals;
exports.registerCmsDependencies = registerCmsDependencies.registerCmsDependencies;
