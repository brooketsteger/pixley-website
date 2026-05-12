import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the Pixley website, applications, and streaming services.",
  alternates: { canonical: "https://usepixley.com/tos" },
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" effectiveDate="May 11, 2026">
      <p>
        Welcome to Pixley. These Terms of Service (&ldquo;Terms&rdquo;) govern
        your access to and use of the Pixley website, applications, and
        streaming services (collectively, the &ldquo;Service&rdquo;) provided
        by Pixley (&ldquo;Pixley,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo;
        or &ldquo;us&rdquo;).
      </p>
      <p>
        By accessing or using the Service, you agree to be bound by these
        Terms. If you do not agree to these Terms, you may not use the Service.
      </p>

      <Section title="1. Description of the Service">
        <p>
          Pixley is a streaming platform designed for children and families.
          The platform allows parents or guardians to curate and control
          content channels that appear within the Pixley application.
        </p>
        <p>
          Parents manage the content sources and channels available to their
          children within the Service.
        </p>
        <p>
          Pixley does not create most of the content available through the
          Service; rather, the platform organizes and displays content from
          approved sources selected by parents. Pixley has no control over
          what new content approved creators are publishing and it is up to
          the parent or guardian to remove approved channels should the nature
          of the content change or be unwanted.
        </p>
      </Section>

      <Section title="2. Eligibility">
        <p>
          The Service is intended to be used by parents or legal guardians who
          manage accounts for their families.
        </p>
        <p>By creating an account, you represent that:</p>
        <List
          items={[
            "You are at least 18 years old, or the age of majority in your jurisdiction.",
            "You are the parent or legal guardian of any children using the Service through your account.",
            "You are responsible for supervising children who use the Service.",
          ]}
        />
      </Section>

      <Section title="3. User accounts">
        <p>To access certain features, you may need to create an account.</p>
        <p>You agree to:</p>
        <List
          items={[
            "Provide accurate and complete information.",
            "Maintain the security of your account credentials.",
            "Accept responsibility for all activity that occurs under your account.",
          ]}
        />
        <p>
          If you believe your account has been compromised, please contact us
          immediately at:{" "}
          <a className="text-coral hover:underline" href="mailto:support@usepixley.com">
            support@usepixley.com
          </a>
        </p>
      </Section>

      <Section title="4. Google account integration (OAuth)">
        <p>
          Pixley may allow users to sign in using Google OAuth 2.0 or connect
          Google services such as YouTube in order to select or manage video
          content.
        </p>
        <p>By connecting your Google account:</p>
        <List
          items={[
            "You authorize Pixley to access certain Google account information permitted by the permissions you grant.",
            "Pixley will only use Google user data to provide and improve the Pixley Service.",
          ]}
        />
        <p>
          Pixley&rsquo;s use and transfer of information received from Google
          APIs will comply with the Google API Services User Data Policy,
          including the Limited Use requirements.
        </p>
        <p>Pixley will not:</p>
        <List
          items={[
            "Sell Google user data",
            "Use Google data for advertising",
            "Access data beyond what is necessary to provide the Service",
          ]}
        />
        <p>
          You may revoke Pixley&rsquo;s access to your Google account at any
          time through your Google security settings.
        </p>
      </Section>

      <Section title="5. Acceptable use">
        <p>You agree not to:</p>
        <List
          items={[
            "Use the Service for unlawful purposes",
            "Attempt to disrupt or interfere with the Service",
            "Attempt to gain unauthorized access to systems or accounts",
            "Circumvent parental controls or content restrictions",
            "Use the platform to distribute harmful, abusive, or illegal material",
          ]}
        />
        <p>
          Pixley reserves the right to suspend or terminate accounts that
          violate these Terms.
        </p>
      </Section>

      <Section title="6. Content and third-party services">
        <p>
          Pixley may display or organize content provided by third-party
          platforms such as YouTube.
        </p>
        <p>
          We do not control all third-party content and are not responsible
          for:
        </p>
        <List
          items={[
            "The accuracy of third-party content",
            "The availability of external services",
            "Changes made by third-party platforms",
          ]}
        />
        <p>
          Use of third-party services may also be governed by their respective
          terms and policies.
        </p>
      </Section>

      <Section title="7. Children&rsquo;s use of the Service">
        <p>
          Pixley is designed for children but must be used under the
          supervision of a parent or guardian.
        </p>
        <p>Parents are responsible for:</p>
        <List
          items={[
            "Selecting appropriate content channels",
            "Monitoring children&rsquo;s use of the Service",
            "Managing connected accounts",
          ]}
        />
        <p>
          Pixley does not knowingly allow children to create independent
          accounts without parental control.
        </p>
      </Section>

      <Section title="8. Intellectual property">
        <p>
          All Pixley software, branding, and platform functionality are the
          property of Pixley or its licensors and are protected by applicable
          intellectual property laws.
        </p>
        <p>You may not:</p>
        <List
          items={["Copy", "Modify", "Distribute", "Reverse engineer", "Reproduce"]}
        />
        <p>
          any part of the Pixley platform without written permission.
        </p>
      </Section>

      <Section title="9. Termination and account deletion">
        <p>We may suspend or terminate access to the Service if:</p>
        <List
          items={[
            "You violate these Terms",
            "We are required to comply with legal obligations",
            "The Service is discontinued",
          ]}
        />
        <h3 className="text-lg font-bold">Deleting your account</h3>
        <p>
          You may delete your Pixley account at any time from inside the app.
          Open the <strong>Parents</strong> tab and select{" "}
          <strong>Delete Account</strong>.
        </p>
        <p>
          After you request deletion, your account enters a 7-day recovery
          period. If you sign back in within those 7 days, your account is
          restored. After 7 days, your account and all associated personal data
          are <strong>permanently purged</strong> and cannot be restored.
        </p>
        <p>
          If you have any questions or need help with account deletion, you can
          also contact us at{" "}
          <a className="text-coral hover:underline" href="mailto:support@usepixley.com">
            support@usepixley.com
          </a>
          .
        </p>
      </Section>

      <Section title="10. Disclaimer of warranties">
        <p>
          The Pixley Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available.&rdquo;
        </p>
        <p>Pixley does not guarantee:</p>
        <List
          items={[
            "Continuous or uninterrupted service",
            "That all content will always be available",
            "That the Service will be error-free",
          ]}
        />
        <p>
          To the fullest extent permitted by law, Pixley disclaims all
          warranties, express or implied.
        </p>
      </Section>

      <Section title="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Pixley will not be liable
          for:
        </p>
        <List
          items={[
            "Indirect or incidental damages",
            "Loss of data",
            "Loss of access to third-party content",
            "Service interruptions",
          ]}
        />
        <p>Your use of the Service is at your own risk.</p>
      </Section>

      <Section title="12. Changes to the Service">
        <p>
          Pixley may modify, update, or discontinue parts of the Service at
          any time without prior notice.
        </p>
        <p>
          We may also update these Terms periodically. Continued use of the
          Service after updates constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="13. Governing law">
        <p>
          These Terms will be governed by the laws of the jurisdiction in
          which Pixley operates, without regard to conflict-of-law principles.
        </p>
      </Section>

      <Section title="14. Contact information">
        <p>If you have questions about these Terms, please contact us at:</p>
        <p>
          <strong>Pixley</strong>
          <br />
          Website:{" "}
          <a className="text-coral hover:underline" href="https://usepixley.com">
            https://usepixley.com
          </a>
          <br />
          Email:{" "}
          <a className="text-coral hover:underline" href="mailto:support@usepixley.com">
            support@usepixley.com
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
