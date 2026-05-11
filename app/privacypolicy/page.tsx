import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pixley collects, uses, and protects information about families using the Pixley streaming service.",
  alternates: { canonical: "https://usepixley.com/privacypolicy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="March 1, 2026">
      <p>
        Pixley (&ldquo;Pixley,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;) respects your privacy and is committed to protecting
        the personal information of families who use our service. This Privacy
        Policy explains how we collect, use, store, and share information when
        you use the Pixley website, mobile applications, and streaming services
        (collectively, the &ldquo;Service&rdquo;).
      </p>
      <p>
        Pixley is a streaming platform designed for children, where parents or
        guardians create and control the channels and content sources available
        to their children.
      </p>
      <p>
        By using the Service, you agree to the collection and use of
        information in accordance with this Privacy Policy.
      </p>

      <Section title="1. Information we collect">
        <p>
          We collect information in several ways to operate and improve the
          Pixley Service.
        </p>
        <h3 className="text-lg font-bold">Information you provide</h3>
        <p>
          When parents or guardians create an account or interact with Pixley,
          we may collect:
        </p>
        <List
          items={[
            "Name",
            "Email address",
            "Account login credentials",
            "Parent profile settings",
            "Channel selections and content preferences",
            "Communications you send to us",
          ]}
        />
        <p>
          Parents are responsible for managing any profiles or viewing
          permissions associated with children using the Service.
        </p>

        <h3 className="text-lg font-bold">Information collected automatically</h3>
        <p>
          When you use Pixley, we may automatically collect certain technical
          information, including:
        </p>
        <List
          items={[
            "Device type",
            "Operating system",
            "Browser type",
            "IP address",
            "App usage data",
            "Streaming activity within the Pixley platform",
            "Performance and diagnostic information",
          ]}
        />
        <p>
          This information helps us operate, maintain, and improve the Service.
        </p>

        <h3 className="text-lg font-bold">Google account information (OAuth)</h3>
        <p>
          Pixley may allow parents to sign in using Google OAuth 2.0 or connect
          a Google account to import or manage video content from supported
          services such as YouTube.
        </p>
        <p>
          If you authorize Pixley to access your Google account, we may receive
          certain information depending on the permissions granted, such as:
        </p>
        <List
          items={[
            "Basic profile information (name, email address)",
            "YouTube account identifiers",
            "Channel or playlist information necessary to display selected content within Pixley",
          ]}
        />
        <p>
          Pixley&rsquo;s use of information received from Google APIs will
          adhere to the Google API Services User Data Policy, including the
          Limited Use requirements.
        </p>
        <p>
          We do not sell Google user data and do not use Google user data for
          advertising purposes.
        </p>
      </Section>

      <Section title="2. How we use information">
        <p>We use collected information to:</p>
        <List
          items={[
            "Provide and operate the Pixley streaming service",
            "Allow parents to manage and control content channels",
            "Personalize user experience",
            "Authenticate users and maintain account security",
            "Improve product functionality and performance",
            "Provide customer support",
            "Comply with legal obligations",
          ]}
        />
        <p>
          We only access the minimum data necessary to provide these services.
        </p>
      </Section>

      <Section title="3. Children&rsquo;s privacy">
        <p>
          Pixley is designed for use by children under the supervision of a
          parent or guardian.
        </p>
        <p>Parents control:</p>
        <List
          items={[
            "Which content sources are available",
            "What channels appear in the child&rsquo;s interface",
            "Any connected accounts",
          ]}
        />
        <p>
          Pixley does not knowingly collect personal information directly from
          children without parental involvement.
        </p>
        <p>Parents or guardians can contact us at any time to:</p>
        <List
          items={[
            "Review information associated with their account",
            "Request deletion of account data",
            "Ask questions about children&rsquo;s privacy",
          ]}
        />
      </Section>

      <Section title="4. How we share information">
        <p>Pixley does not sell personal information.</p>
        <p>We may share information in limited situations:</p>
        <h3 className="text-lg font-bold">Service providers</h3>
        <p>
          We may share information with trusted service providers who help
          operate the platform, such as:
        </p>
        <List
          items={[
            "Cloud hosting providers",
            "Authentication services",
            "Analytics providers",
            "Customer support tools",
          ]}
        />
        <p>
          These providers are contractually obligated to protect your
          information.
        </p>
        <h3 className="text-lg font-bold">Legal requirements</h3>
        <p>We may disclose information if required to:</p>
        <List
          items={[
            "Comply with applicable laws or regulations",
            "Respond to lawful government requests",
            "Protect the safety and security of Pixley, our users, or the public",
          ]}
        />
      </Section>

      <Section title="5. Data security">
        <p>
          Pixley implements industry-standard technical and organizational
          safeguards to protect your data, including:
        </p>
        <List
          items={[
            "Secure encrypted connections (HTTPS)",
            "Access controls",
            "Secure cloud infrastructure",
            "Monitoring for unauthorized access",
          ]}
        />
        <p>However, no online service can guarantee absolute security.</p>
      </Section>

      <Section title="6. Data retention">
        <p>We retain personal information only as long as necessary to:</p>
        <List
          items={[
            "Provide the Pixley service",
            "Maintain your account",
            "Comply with legal obligations",
          ]}
        />
        <p>
          Users may request deletion of their account and associated data at
          any time.
        </p>
      </Section>

      <Section title="7. Your privacy rights">
        <p>Depending on your location, you may have rights to:</p>
        <List
          items={[
            "Access personal data we hold about you",
            "Request correction of inaccurate information",
            "Request deletion of your data",
            "Withdraw consent to certain data processing",
          ]}
        />
        <p>
          To exercise these rights, please contact us using the information
          below.
        </p>
      </Section>

      <Section title="8. Third-party services">
        <p>
          Pixley may integrate with third-party services such as YouTube or
          Google authentication.
        </p>
        <p>
          These services are governed by their own privacy policies. We
          encourage you to review:
        </p>
        <List items={["Google Privacy Policy", "YouTube Terms of Service"]} />
        <p>
          Pixley only accesses data necessary to provide the functionality
          requested by the user.
        </p>
      </Section>

      <Section title="9. Changes to this Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. If we make
          significant changes, we will update the effective date and provide
          notice within the Service or on our website.
        </p>
      </Section>

      <Section title="10. Contact information">
        <p>
          If you have questions about this Privacy Policy or our privacy
          practices, you may contact us at:
        </p>
        <p>
          <strong>Pixley</strong>
          <br />
          Email:{" "}
          <a className="text-coral hover:underline" href="mailto:privacy@usepixley.com">
            privacy@usepixley.com
          </a>
          <br />
          Website:{" "}
          <a className="text-coral hover:underline" href="https://usepixley.com">
            https://usepixley.com
          </a>
        </p>
      </Section>

      <Section title="Google API Services Disclosure">
        <p>
          Pixley&rsquo;s use and transfer of information received from Google
          APIs to any other app will adhere to the Google API Services User
          Data Policy, including the Limited Use requirements.
        </p>
        <p>
          Pixley only uses access to Google user data to provide the
          functionality requested by the user within the Pixley platform.
          Pixley does not sell Google user data and does not use Google user
          data for advertising purposes.
        </p>
        <p>
          Users may revoke Pixley&rsquo;s access to their Google account at any
          time through their Google account security settings.
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-cocoa">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="ml-6 list-disc space-y-1">
      {items.map((item) => (
        <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
}
