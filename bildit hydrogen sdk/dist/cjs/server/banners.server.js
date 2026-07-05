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

var preview_server = require('./preview.server.js');

const BILDIT_WEB_BANNERS_PATH = '/remote-webbanners_v1_4';
async function getBanners(location, previewDate, env) {
    var _a, _b, _c;
    const apiUrl = (_a = env.BILDIT_API_URL) === null || _a === void 0 ? void 0 : _a.trim();
    const apiKey = (_b = env.BILDIT_API_KEY) === null || _b === void 0 ? void 0 : _b.trim();
    if (!apiUrl || !apiKey) {
        return [];
    }
    try {
        const baseUrl = new URL(apiUrl);
        baseUrl.pathname = BILDIT_WEB_BANNERS_PATH;
        baseUrl.searchParams.set('key', apiKey);
        baseUrl.searchParams.set('location', location || '/');
        if (previewDate) {
            baseUrl.searchParams.set('date', previewDate);
        }
        const response = await fetch(baseUrl.toString());
        if (!response.ok) {
            console.error(`[BILDIT] Banner fetch failed (${response.status}) for ${location}`);
            return [];
        }
        const data = (await response.json());
        return (_c = data === null || data === void 0 ? void 0 : data.data) !== null && _c !== void 0 ? _c : [];
    }
    catch (error) {
        console.error('[BILDIT] Banner fetch error:', error);
        return [];
    }
}
/** Fetch banners for a Hydrogen root loader Request. */
async function getBannersForRequest(request, env) {
    const url = new URL(request.url);
    const previewDate = preview_server.getPreviewDateFromRequest(request);
    return getBanners(url.pathname, previewDate != null ? String(previewDate) : undefined, env);
}

exports.getBanners = getBanners;
exports.getBannersForRequest = getBannersForRequest;
