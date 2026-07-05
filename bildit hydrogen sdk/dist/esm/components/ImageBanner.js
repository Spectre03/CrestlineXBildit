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
import { jsx } from 'react/jsx-runtime';
import { memo, useMemo } from 'react';
import { isLiteralNullishUrlString } from '@bildit-platform/react-core';

const EMPTY_LEN = 0;
const STYLES = Object.freeze({
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    bottomMargin: {
        marginBottom: '32px',
    },
    fillImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
});
const ImageBanner = ({ id, imgProps }) => {
    const imgContent = useMemo(() => {
        var _a, _b;
        if (imgProps === null)
            return null;
        const { adobeAnalytics, alternateText, image, preview, url } = imgProps;
        if (typeof image !== 'string')
            return null;
        if (isLiteralNullishUrlString(image))
            return null;
        const altText = typeof alternateText === 'string' && alternateText.trim().length > 0
            ? alternateText.trim()
            : 'Banner image';
        const hasDimensions = preview &&
            !Number.isNaN(+((_a = preview.h) !== null && _a !== void 0 ? _a : Number.NaN)) &&
            !Number.isNaN(+((_b = preview.w) !== null && _b !== void 0 ? _b : Number.NaN));
        const content = (jsx("img", { src: image, alt: altText, width: hasDimensions ? preview === null || preview === void 0 ? void 0 : preview.w : undefined, height: hasDimensions ? preview === null || preview === void 0 ? void 0 : preview.h : undefined, style: hasDimensions ? undefined : STYLES.fillImage }));
        const hasLink = !!(url && url.length > EMPTY_LEN) && !isLiteralNullishUrlString(url);
        const imageContent = (jsx("div", { style: {
                ...STYLES.imageWrapper,
                ...(imgProps.addBottomMargin ? STYLES.bottomMargin : undefined),
            }, children: hasLink ? (jsx("a", { "data-aali": adobeAnalytics, href: url, children: content })) : (content) }));
        return (jsx("div", { id: id, style: { display: 'contents' }, children: imageContent }));
    }, [id, imgProps]);
    return imgContent;
};
var ImageBanner$1 = memo(ImageBanner);

export { ImageBanner$1 as default };
