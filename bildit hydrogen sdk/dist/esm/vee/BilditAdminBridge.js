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
import { useEffect } from 'react';
import { ensureHostReactGlobals } from './ensureHostReactGlobals.js';

/**
 * Bundled-React admin build (USE_EXTERNAL_REACT=false).
 * The CDN no-react build externalizes `react` but not `react/jsx-runtime`, which
 * causes "Objects are not valid as a React child" in non-Next hosts like Hydrogen.
 */
const DEFAULT_ADMIN_SCRIPT = 'https://bildit-cdn.bilditon.com/cms-client-hydrogen/scripts/admin.js';
/**
 * VEE Live Editor bridge: listens for INJECT_SCRIPT from the CMS iframe parent
 * and loads the BILDIT admin script.
 */
function BilditAdminBridge({ adminScript = DEFAULT_ADMIN_SCRIPT, }) {
    useEffect(() => {
        if (typeof window === 'undefined')
            return undefined;
        window.parent.postMessage({ type: 'IFRAME_READY', success: true }, '*');
        const onMessage = (event) => {
            var _a;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.type) !== 'INJECT_SCRIPT')
                return;
            if (window.__adminScriptInjected)
                return;
            window.__adminScriptInjected = true;
            // Re-sync after BilditProvider may have reassigned window.React/ReactDOM.
            ensureHostReactGlobals();
            const script = document.createElement('script');
            script.src = `${adminScript}?v=${Date.now()}`;
            script.onload = () => {
                window.parent.postMessage({ type: 'SCRIPT_INJECTED', success: true }, '*');
            };
            script.onerror = () => {
                console.error('[BILDIT] Failed to load admin script:', script.src);
                window.parent.postMessage({
                    type: 'SCRIPT_INJECTED',
                    success: false,
                    error: 'Failed to load script',
                }, '*');
            };
            document.body.appendChild(script);
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [adminScript]);
    return null;
}

export { BilditAdminBridge, DEFAULT_ADMIN_SCRIPT };
