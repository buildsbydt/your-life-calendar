import React from 'react';

export default function PrivacyPolicy() {
  const effectiveDate = "July 7, 2025"; // Set this to your launch date

  return (
    <div className="w-full max-w-3xl mx-auto text-left text-gray-700 p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Privacy Policy</h2>
      <p className="text-center text-sm text-gray-500 mb-6">Last Updated: {effectiveDate}</p>

      <div className="space-y-4 text-sm">
        <p>
          Welcome to Your life Calendar. Your privacy is critically important to us. This privacy policy outlines how we handle your information when you use our web application.
        </p>

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

        <h3 className="text-lg font-semibold pt-2">4. Third-Party Services</h3>
        <p>
          We do not use any third-party analytics or tracking services that would collect your personal information.
        </p>

        <h3 className="text-lg font-semibold pt-2">5. Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </p>

        <h3 className="text-lg font-semibold pt-2">6. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at YourLifeCalendar@Proton.Me
        </p>
      </div>
    </div>
  );
}
