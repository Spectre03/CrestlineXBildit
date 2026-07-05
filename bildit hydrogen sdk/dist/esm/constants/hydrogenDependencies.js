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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as JsxDevRuntime from 'react/jsx-dev-runtime';
import * as JsxRuntime from 'react/jsx-runtime';
import * as ReactRouter from 'react-router';
import * as Hydrogen from '@shopify/hydrogen';
export { compiledLanguages, staticLanguages, supportedLanguages } from '@bildit-platform/react-core';

/** Module map for @bildit-platform/engine banner interpretation (Hydrogen-native, no next/*). */
const hydrogenDependenciesConfig = {
    react: { module: React },
    'react/jsx-runtime': { module: JsxRuntime },
    'react/jsx-dev-runtime': { module: JsxDevRuntime },
    'react-dom': { module: ReactDOM },
    'react-dom/client': { module: ReactDOMClient },
    'react-router': { module: ReactRouter },
    '@shopify/hydrogen': { module: Hydrogen },
};

export { hydrogenDependenciesConfig };
