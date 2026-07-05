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

/** Domains allowed to embed this storefront in an iframe (VEE Live Editor). */
const BILDIT_FRAME_ANCESTORS = [
    "'self'",
    'http://localhost:*',
    'https://admin-dev.bildit.co',
    'https://admin-staging.bildit.co',
    'https://admin.bildit.co',
    'https://*.web.app',
    'https://*.firebaseapp.com',
];
const BILDIT_CSP_SOURCES = [
    'https://bildit-cdn.bilditon.com',
    'https://us-east1-bildit-dev.cloudfunctions.net',
    'https://us-central1-bildit-dev.cloudfunctions.net',
    'https://us-east1-bilditcms.cloudfunctions.net',
    'https://us-central1-bilditcms.cloudfunctions.net',
];
/** BILDIT admin.js reports errors to Sentry (blocked without this). */
const SENTRY_CONNECT_SOURCES = [
    'https://*.ingest.us.sentry.io',
    'https://*.ingest.sentry.io',
];
/**
 * Hydrogen merges custom frameAncestors with the default `'none'`, which still
 * blocks all framing. Replace the directive so VEE can iframe the storefront.
 */
function allowBilditIframeEmbedding(header) {
    const withoutFrameAncestors = header
        .replace(/frame-ancestors[^;]+;?\s*/g, '')
        .trim()
        .replace(/;+\s*$/, '');
    return `${withoutFrameAncestors}; frame-ancestors ${BILDIT_FRAME_ANCESTORS.join(' ')}`;
}
/**
 * Extend Hydrogen's CSP — do not replace Shopify defaults.
 * Passing only BILDIT domains previously dropped cdn.shopify.com and 'self'.
 */
const bilditCspDirectives = {
    connectSrc: [...BILDIT_CSP_SOURCES, ...SENTRY_CONNECT_SOURCES],
    scriptSrc: [
        "'self'",
        'http://localhost:*',
        'https://cdn.shopify.com',
        ...BILDIT_CSP_SOURCES,
    ],
    imgSrc: [
        "'self'",
        'https://cdn.shopify.com',
        'https://bildit-cdn.bilditon.com',
        'data:',
        'blob:',
        'http://localhost:*',
    ],
};

exports.allowBilditIframeEmbedding = allowBilditIframeEmbedding;
exports.bilditCspDirectives = bilditCspDirectives;
