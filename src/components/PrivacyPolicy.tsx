import React from 'react';

export default function PrivacyPolicy() {
  const effectiveDate = "3 November 2026";

  return (
    <div className="w-full max-w-3xl mx-auto text-left text-gray-700 p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Privacy Policy</h2>
      <p className="text-center text-sm text-gray-500 mb-6">Last Updated: {effectiveDate}</p>

      <div className="space-y-4 text-sm">
        <p>
          Welcome to Your life Calendar. Your privacy is critically important to us. This privacy policy outlines how we handle your information when you use our web application.
          
        </p>
        <p>This site is operated by BuildsbyDT. You can reach us at YourLifeCalendar@Proton.Me.</p>


        <h3 className="text-lg font-semibold pt-2">1. Information We Collect</h3>
        <p>
          To generate your "Life in Weeks" calendar and countdown, we require two pieces of information:
        </p>
        <ul className="list-disc list-inside pl-4">
          <li>Your Date of Birth (DOB)</li>
          <li>Your estimated Date of Death (DOD)</li>
        </ul>

        <h3 className="text-lg font-semibold pt-2">2. How We Use Your Information</h3>
        <p>
          The information you provide is used exclusively for the core functionality of this web application. The calculations to generate your calendar and countdown are performed directly in your web browser.
        </p>

        <h3 className="text-lg font-semibold pt-2">3. Data Storage and Security</h3>
        <p>
          <strong>We do not store, save, or transmit your personal data to any server.</strong> All information you enter (your DOB and DOD) exists only on your local device for the duration of your session. When you close your browser tab, the information is gone. We have no access to it at any point.
        </p>
        <p>
          The only data stored in your browser's `localStorage` is your preferred quote category (e.g., "motivational", "stoic"), so the app can remember your choice for your next visit. This does not contain any personal information.
        </p>

        <h3 className="text-lg font-semibold pt-2">4. Third-Party Services (Analytics)</h3>
        <p>
          To understand how the site is used and to monitor performance, we use two privacy-friendly services provided by our hosting provider, Vercel Inc.:
        </p>
        <ul className="list-disc list-inside pl-4">
          <li>
            <strong>Vercel Web Analytics</strong> &mdash; collects aggregated, anonymised usage data such as page views, referring site, country, browser and operating system. It does not set cookies and does not use cross-site identifiers; visitor IP addresses are hashed and discarded.
          </li>
          <li>
            <strong>Vercel Speed Insights</strong> &mdash; collects anonymised technical performance measurements (e.g. page load times and layout shifts) to help us improve the site. It does not set cookies and does not store personal data.
          </li>
        </ul>
        <p>
          Neither service identifies you individually. Full details are available in Vercel's privacy notice at{' '}
          <a href="https://vercel.com/legal/privacy-policy" className="underline" target="_blank" rel="noopener noreferrer">
            vercel.com/legal/privacy-policy
          </a>.
        </p>
        <p>
          Our lawful basis for this processing under Article 6(1)(f) of the UK GDPR is our legitimate interest in understanding site usage and maintaining performance. Vercel is based in the United States, so any analytics data may be transferred outside the United Kingdom under the safeguards described in Vercel's data processing terms. You can object to this processing at any time using the contact details below; please note that doing so does not affect the lawfulness of processing already carried out.
        </p>
        <p>
          The site also loads the "Covered By Your Grace" web font from Google Fonts. This causes your browser to make a request to Google's servers, which will see your IP address and user agent. Google states that these requests are not used for advertising or user profiling.
        </p>

        <h3 className="text-lg font-semibold pt-2">5. Your Rights Under UK GDPR</h3>
        <p>
          You have the right to be informed about, access, rectify, erase, restrict or object to the processing of personal data held about you, and the right to data portability. Because we do not store any personal data about you (your dates of birth and death never leave your browser), there is in practice no personal record for us to retrieve, correct or delete.
        </p>
        <p>
          If you have concerns about how your data is handled, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at{' '}
          <a href="https://ico.org.uk" className="underline" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>.
        </p>

        <h3 className="text-lg font-semibold pt-2">6. Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted on this page with a revised "Last Updated" date.
        </p>

        <h3 className="text-lg font-semibold pt-2">7. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy or wish to exercise any of your rights, you can contact us at YourLifeCalendar@Proton.Me.
        </p>
      </div>
    </div>
  );
}
