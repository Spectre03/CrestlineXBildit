import {type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';

const POLICY_CONTENT: Record<string, {title: string; body: string}> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: `
      <p>At Crestline Commerce, your privacy is our priority. This policy outlines how we collect, use, and protect your personal information.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you place an order or create an account.</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to process orders, communicate with you about your orders, send promotional communications (with your consent), and improve our services.</p>
      <h2>Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal data. All payment transactions are encrypted using SSL technology.</p>
      <h2>Third-Party Sharing</h2>
      <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our website and conducting our business.</p>
      <h2>Cookies</h2>
      <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
      <h2>Contact Us</h2>
      <p>If you have questions about this privacy policy, please contact us at privacy@crestlinecommerce.com.</p>
    `,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    body: `
      <p>By accessing and using the Crestline Commerce website, you agree to be bound by the following terms and conditions.</p>
      <h2>Use of the Website</h2>
      <p>You agree to use this website for lawful purposes only. You must not use this site in any way that breaches applicable local, national, or international laws or regulations.</p>
      <h2>Products and Pricing</h2>
      <p>All prices are displayed in USD and are subject to change without notice. We reserve the right to modify or discontinue products at any time.</p>
      <h2>Orders and Payment</h2>
      <p>By placing an order, you confirm that the information you provide is accurate and complete. We reserve the right to cancel any order at our discretion.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this website, including text, graphics, logos, and images, is the property of Crestline Commerce and is protected by applicable intellectual property laws.</p>
      <h2>Limitation of Liability</h2>
      <p>Crestline Commerce shall not be liable for any indirect, incidental, or consequential damages arising out of your use of this website or our products.</p>
      <h2>Changes to Terms</h2>
      <p>We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
    `,
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    body: `
      <p>We are committed to delivering your order as quickly and safely as possible.</p>
      <h2>Processing Time</h2>
      <p>Orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
      <h2>Shipping Rates</h2>
      <p>Free standard shipping on all orders over $150. Orders under $150 are charged a flat rate of $8.99 for standard shipping.</p>
      <h2>Delivery Times</h2>
      <ul>
        <li>Standard Shipping: 5–7 business days</li>
        <li>Express Shipping: 2–3 business days ($14.99)</li>
        <li>Overnight Shipping: Next business day ($29.99)</li>
      </ul>
      <h2>International Shipping</h2>
      <p>We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Customs duties and taxes are the responsibility of the recipient.</p>
      <h2>Order Tracking</h2>
      <p>Once your order ships, you will receive a tracking number via email to monitor your delivery status.</p>
    `,
  },
  'refund-policy': {
    title: 'Refund Policy',
    body: `
      <p>We want you to be completely satisfied with your purchase. If you are not happy with your order, we are here to help.</p>
      <h2>Returns</h2>
      <p>Items may be returned within 30 days of delivery. To be eligible for a return, items must be unused, in their original condition, and in original packaging.</p>
      <h2>How to Initiate a Return</h2>
      <p>Contact our support team at returns@crestlinecommerce.com with your order number and reason for return. We will provide you with a prepaid return shipping label.</p>
      <h2>Refunds</h2>
      <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds are processed within 5–7 business days to your original payment method.</p>
      <h2>Exchanges</h2>
      <p>We replace items that are defective or damaged. If you need an exchange, contact us at support@crestlinecommerce.com.</p>
      <h2>Sale Items</h2>
      <p>Sale items are eligible for store credit only. Final sale items cannot be returned or exchanged.</p>
    `,
  },
};

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.policyHandle ?? '';
  const policy = POLICY_CONTENT[handle];

  if (!policy) {
    throw new Response('Not found', {status: 404});
  }

  return json({policy, handle});
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return [{title: `${data?.policy?.title} | Crestline Commerce`}];
};

export default function PolicyPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link
        to="/policies"
        className="text-[10px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors duration-300 mb-8 inline-block"
      >
        &larr; Back to Policies
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 leading-tight">
        {policy.title}
      </h1>
      <div
        className="prose prose-sm max-w-none text-primary/70 leading-relaxed"
        dangerouslySetInnerHTML={{__html: policy.body}}
      />
    </div>
  );
}
