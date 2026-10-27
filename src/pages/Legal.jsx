import { Eyebrow, Button } from '../components/Primitives';
import Icon from '../components/Icon';
import { plusBenefits } from '../data/plans';
import { betaRelease } from '../data/release';

export const contactEmail = 'nyxrinc@gmail.com';
export const contactHref = `mailto:${contactEmail}`;
const updated = '27 October 2026';
const Email = () => <a href={contactHref}>{contactEmail}</a>;

const policies = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'How the website, local desktop data, optional account services and connected AI or browser tools handle information.',
    sections: [
      [
        'scope',
        'Who this policy is for',
        <>
          <p>
            This policy describes the NYXR project website in its current pre-release form. You can
            contact the NYXR team at <Email /> about privacy or this policy.
          </p>
          <p>
            The website is a product showcase. It is not a hosted copy of the desktop assistant. The
            desktop overview below explains important differences; any additional service-specific
            privacy information will be provided when that service is introduced.
          </p>
        </>,
      ],
      [
        'website',
        'Using this website',
        <>
          <p>
            The current website has no account registration, checkout, advertising trackers,
            analytics integration or live AI connection. Its demos, theme previews and voice
            animations run in your browser. The website does not request microphone, camera or GPS
            access, upload your files, or send demo prompts to an AI provider.
          </p>
          <p>
            Your browser requests the site’s pages, images, scripts and product film from the server
            hosting it. A public hosting service receives ordinary request information, such as IP
            address, requested URL and browser headers, and may maintain operational or security
            logs under its own policies. There is no visitor-log database in this website’s
            application code. Contact us for information about a particular public deployment;
            hosting retention should not be assumed to be zero.
          </p>
          <p>
            The NYXR website is hosted on Vercel. Beta installer and corresponding-source downloads
            are served through GitHub Releases and its asset infrastructure. These services receive
            the network information needed to serve your request. See{' '}
            <a href="https://vercel.com/legal/privacy-policy">Vercel’s Privacy Policy</a> and{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub’s Privacy Statement
            </a>
            . Downloading does not give this website access to your desktop conversations, provider
            keys or local files.
          </p>
        </>,
      ],
      [
        'preferences',
        'Country, currency and browser storage',
        <>
          <p>
            We use your browser’s language and time-zone settings locally to suggest a country and
            display currency. This is an estimate, not verified location or billing residence. No
            third-party IP lookup or precise geolocation service is used.
          </p>
          <p>
            If you change the country or currency, your choice is saved on this device in local
            storage under <code>nyxr.website.region.v1</code>. It contains the selected country
            code, currency code and preference version. It is used to personalize the display, not
            to create an account or determine taxes.
          </p>
          <p>
            The preference remains until you change it or clear this site’s browser data. You can
            clear it through your browser’s site-storage settings. If storage is unavailable, the
            current choice lasts only for the session. The website code does not set advertising or
            tracking cookies.
          </p>
        </>,
      ],
      [
        'contact-data',
        'When you contact us',
        <>
          <p>
            If you email <Email />, we receive your address, message and any attachments you choose
            to send. We use them to answer your request, investigate a reported issue and keep
            relevant support correspondence. Email is handled through Gmail and may be processed by
            Google and its service providers in other countries.
          </p>
          <p>
            We keep correspondence while needed to handle the request and related follow-up, resolve
            disputes or meet applicable obligations. You can ask us about access, correction or
            deletion. Please do not email passwords, API keys or unrelated private files; sanitized
            logs and reproduction steps are usually enough.
          </p>
        </>,
      ],
      [
        'desktop',
        'The NYXR desktop application',
        <>
          <p>
            Desktop conversations, memory, projects, settings and task checkpoints are handled by
            the installed app and its configured integrations. Guided setup progress and dismissal
            are saved locally with your preferences. Credentials use NYXR’s CredentialStore,
            including Windows Credential Manager where supported. This website does not read that
            local app data.
          </p>
          <p>
            When you use a cloud model, relevant prompts, conversation context, attachments or
            screenshots, requested browser content or tool results may be sent to the selected
            provider as required for your request. NYXR uses your own provider keys or configured
            provider account; there is no NYXR inference-credit balance. Voice and other connected
            tools may use their configured services. Those providers apply their own terms,
            retention and processing policies; we do not promise that all providers have identical
            privacy practices.
          </p>
          <p>
            Choosing Ollama’s local mode runs model inference on your own hardware. Other enabled
            browser, search, voice or cloud tools can still make network requests. A local model
            selection alone does not make every tool offline.
          </p>
        </>,
      ],
      [
        'accounts',
        'Optional NYXR accounts and planned Firebase services',
        <>
          <p>
            An NYXR account is optional for local desktop use and direct connections using your own
            provider credentials. Optional NYXR accounts are being developed with Firebase
            Authentication. This describes the intended account service, not a claim that public
            sign-in or cloud sync is available or verified. Availability depends on the release’s
            configured services and their status in Account settings. This website itself has no
            sign-in form or Firebase account connection.
          </p>
          <p>
            If a configured release enables Firebase sign-in and you choose it, Google/Firebase and
            the configured NYXR account service process the identity and authentication data needed
            for that sign-in. Depending on the chosen method, that can include your email address,
            account identifier, display name, profile image, authentication/session tokens and
            sign-in security information. The service must disclose its enabled sign-in methods,
            retention and deletion process before public account use. Do not assume these planned
            services are active merely because they are described here.
          </p>
          <p>
            Account sign-in is separate from provider access and does not grant AI usage credits.
            Local profiles and settings remain on your computer. Any optional account sync must
            identify the selected data categories before you enable it; planned categories may
            include profile preferences, appearance settings and selected project or chat metadata.
            This does not mean conversation messages, source files, recordings or provider keys are
            uploaded by default. Legacy Google/Drive options in development builds have their own
            explicit connection and sync choices; they do not demonstrate a working Firebase
            service.
          </p>
          <p>
            Plus and Student Plus are planned to offer {plusBenefits.backupGB} GB of opt-in
            encrypted cloud backup, sync across {plusBenefits.devices} devices and{' '}
            {plusBenefits.historyDays}-day version history. Teams has implemented beta foundations
            in the current source for explicitly selected text-file collaboration, shared Macro
            libraries through JSON export/import, permissions and activity / audit history.
            Collaboration does not automatically sync whole folders or share binary files. Hosted
            availability is pending account service configuration. These paid services are not live:
            production paid accounts, payments and storage are not configured. Before enabling
            backups, you will choose the data to include and receive the service’s encryption,
            retention and deletion details. Provider keys remain local and are excluded from planned
            NYXR cloud backups.
          </p>
          <p>
            In a configured Teams service, explicitly published workspace notes, text files and
            Macro JSON are readable by permitted team members and the service operator. They are not
            protected by the separate backup passphrase. Review shared content first; never publish
            passwords or provider keys. Macro sharing does not run a Macro automatically. Deleting a
            hosted account removes its owned teams and their shared content; activity records in
            other teams may remain for those teams’ audit history. Local originals stay on the
            device.
          </p>
        </>,
      ],
      [
        'browser',
        'Chrome extension and Native Messaging',
        <>
          <p>
            Chrome integration is optional. In builds that provide it, the NYXR Chrome extension
            communicates with the desktop app through a Native Messaging host installed on your
            computer. Installation, extension permissions and connection status are explained in
            desktop browser setup. Public extension downloads remain coming soon while release
            checks are pending.
          </p>
          <p>
            Browser tasks can read tab URLs, page titles, page text and other requested page or
            interaction data available through the extension’s permissions. NYXR can pass content
            needed for your task to your selected AI provider as prompt or tool context. Native
            Messaging is a local communication channel; it does not make subsequent provider
            requests local. Consider sensitive pages and the selected provider’s data policy before
            asking NYXR to read or act on browser content.
          </p>
          <p>
            You can skip browser setup, disconnect it in the desktop setup controls where supported,
            or disable/remove the extension in Chrome. Skipping account, Chrome or voice setup does
            not prevent use with your own provider keys or a configured local model.
          </p>
        </>,
      ],
      [
        'phone-companion',
        'Android phone companion / beta in testing',
        <>
          <p>
            {betaRelease.companion.available
              ? 'The Android companion is available as a private beta with the matching desktop release. '
              : 'The Android companion is not available in the current Windows beta. '}
            The private beta pairs an Android 10+ phone with a compatible Windows release on the
            same Wi-Fi. Motorola is the initial hardware test target. Pairing is separate from
            optional cloud backup and does not itself enable a NYXR cloud upload.
          </p>
          <p>
            Phone execution requires a verified NYXR account. The account service stores device
            registration and quota records; it does not receive message bodies or contacts for
            allowance accounting. Signed, device-bound allowances may support limited offline use
            until expiry. Pairing credentials and journals are stored on the paired devices.
            Production account/key configuration and physical-device acceptance are still pending.
          </p>
          <p>
            Notification access can expose message previews, sender names and reply actions. Grant
            it only if you want notification reading or supported replies. Native calling, SMS and
            contact lookup require their own permissions. New WhatsApp messages are handed off to
            the phone for review and sending. Call audio on the PC is not supported. You can revoke
            notification access in Android settings and unpair your devices.
          </p>
          <p>
            Phone user content stays local to your paired devices except content you explicitly
            select for a request to your chosen AI provider. That provider may receive the selected
            message or notification context under its own policy. Your phone’s messaging services
            continue to process messages under their own terms. Do not send private message
            contents, pairing codes or provider keys in diagnostics. See the{' '}
            <a href="/guide/#phone-companion">setup and permissions guide</a> before pairing.
          </p>
        </>,
      ],
      [
        'study',
        'Student material and generated presentations',
        <>
          <p>
            PDFs added to the Student workspace, extracted text and lesson conversations are stored
            locally. Extraction does not require an AI request. When you ask the tutor or generate
            slides from material, selected excerpts and recent lesson context are sent to your
            configured provider, or processed by your selected local model. These files and
            conversations are excluded from optional account preference sync.
          </p>
          <p>
            Removing material from the library does not remove your original PDF. Exported
            PowerPoint files are saved to your chosen folder. Check AI explanations and
            presentations against the original sources.
          </p>
        </>,
      ],
      [
        'links',
        'External links and product captures',
        <>
          <p>
            Provider documentation, pricing sources and other external links take you to services
            with their own privacy policies. Clicking an email link opens your mail application; it
            does not send a message automatically.
          </p>
          <p>
            The screenshots and product film on this site use isolated showcase data, not a user’s
            private conversation or provider credentials. See{' '}
            <a href="/captures/">Capture provenance</a> for details.
          </p>
        </>,
      ],
      [
        'choices',
        'Your choices and requests',
        <>
          <p>
            You can browse without creating an account, change display preferences, clear local
            storage, skip optional desktop setup and choose whether to visit an external service or
            email us. You can remove local desktop data using the app’s supported controls or its
            data folder; clearing website storage does not delete desktop or provider data. For
            account or service data requests, contact <Email />. Where applicable law gives you
            rights to access, correct, erase, restrict or object to use of your personal
            information, or to request portability or withdraw consent, contact <Email />. We may
            need reasonable information to verify a request, but will not ask for passwords or API
            keys.
          </p>
          <p>
            You may also raise a concern with the data-protection authority that applies to your
            circumstances. We do not use this showcase to make automated decisions with legal or
            similarly significant effects about visitors.
          </p>
        </>,
      ],
      [
        'changes',
        'Future services and policy updates',
        <>
          <p>
            Billing, subscriptions, account registration and cloud synchronization are not connected
            to this website today. If that changes, we will explain the new data uses and update
            this policy before introducing them. Planned desktop Firebase account processing is
            conditional as described above; it does not establish a public service today. Material
            changes will be highlighted appropriately; the date above identifies this version.
          </p>
          <p>
            For questions, contact <Email />.
          </p>
        </>,
      ],
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    intro:
      'The conditions for using the NYXR showcase website and understanding the product information published here.',
    sections: [
      [
        'scope',
        'Scope and contact',
        <>
          <p>
            These terms apply to the NYXR project website and its informational demos. The NYXR team
            can be reached at <Email />. The desktop application, external providers and any future
            paid services may have additional terms presented separately when applicable.
          </p>
          <p>
            Use the website lawfully and respect these conditions. If you do not wish to use it on
            these terms, you can stop using it. No purchase or paid subscription is created by
            browsing.
          </p>
        </>,
      ],
      [
        'development',
        'Development status and availability',
        <>
          <p>
            NYXR is in active development. Features, integrations and release plans may change. The
            Download page shows the current beta availability, platform, file size, signature status
            and known limitations. A download is offered only when its release assets and
            distribution checks are ready. Beta availability is not a claim that production release
            checks or clean-machine acceptance have passed.
          </p>
          <p>
            Product captures show the interface; scripted walkthroughs are demonstrations, not live
            AI execution or proof that a task will succeed on every computer. We aim to keep
            descriptions accurate and will correct errors brought to our attention.
          </p>
        </>,
      ],
      [
        'pricing',
        'Pricing, free tiers and future billing',
        <>
          <p>
            Core stays free, including BYOK or local chat, coding, voice, Chrome tools, Macros, and
            local PDF tutoring and slides. NYXR imposes no local token quota. Optional future
            subscriptions add cloud services or team collaboration. Provider charges, quotas,
            trials, hardware, electricity and model-license conditions apply separately.
          </p>
          <p>
            FreeLLMAPI figures are attributed publisher estimates of catalog-wide potential. Counts
            and token availability depend on accounts, catalog versions, eligibility, compatibility
            and current provider limits. Direct connections to overlapping providers do not create
            duplicate quotas. See <a href="/pricing/">Pricing & free tiers</a> for sources and
            scope.
          </p>
          <p>
            Planned monthly prices in INR are listed on the <a href="/pricing/">Pricing page</a>.
            Teams is priced per seat. Student Plus has the same planned personal cloud benefits as
            Plus and requires verified student eligibility; self-declaration does not unlock it.
            Paid services are coming soon. This site has no checkout or live billing and takes no
            payments.
          </p>
          <p>
            The plan comparison is a test preview. Previewing a tier changes temporary page UI only
            and resets on reload. It creates no account, subscription, charge or paid entitlement
            and does not verify student eligibility or activate a cloud service.
          </p>
          <p>
            Country and currency selections are display preferences, not verified billing residence
            or currency conversions. Future billing is INR-only. A future checkout must verify
            billing country and show the authoritative server price in INR, taxes, final total,
            renewal conditions and cancellation terms before you agree. Competitor comparisons use
            their stated plans and published currencies, without promising identical entitlements or
            outcomes.
          </p>
        </>,
      ],
      [
        'use',
        'Responsible use',
        <>
          <p>
            Do not use this website or NYXR to access systems or information without permission,
            harm others, distribute malware, evade provider restrictions, or interfere with the
            site’s operation. Use only accounts, content and resources you are authorized to use.
          </p>
          <p>
            Keep your own credentials secure and comply with the terms of any provider you connect.
            In particular, FreeLLMAPI describes its gateway as intended for personal
            experimentation; using it through NYXR does not change upstream restrictions.
          </p>
        </>,
      ],
      [
        'ai',
        'AI output and computer actions',
        <>
          <p>
            AI output can be inaccurate, incomplete or unsuitable. Review generated code and verify
            important information and proposed actions before relying on them. Computer automation
            can change files or application state; choose permissions and approvals appropriate to
            the task and keep backups of important work.
          </p>
          <p>
            Provider or model availability does not guarantee task compatibility, successful
            execution, uninterrupted service or a particular level of quality.
          </p>
        </>,
      ],
      [
        'ownership',
        'Content and third parties',
        <>
          <p>
            NYXR branding, website artwork and site content belong to their respective rights
            holders. You may view and link to this site for its intended informational use. Access
            does not itself grant a license to reuse NYXR branding or third-party material.
          </p>
          <p>
            Third-party names and trademarks are used to identify integrations and comparisons, not
            to imply endorsement or affiliation. Open-source components and models retain their
            applicable licenses. You retain the rights you already have in material you provide; you
            must have permission to use it.
          </p>
        </>,
      ],
      [
        'responsibility',
        'Availability and your legal rights',
        <>
          <p>
            The pre-release showcase and its demos are provided as available. Within the limits
            permitted by applicable law, we do not guarantee error-free, continuous availability or
            particular results. We are not responsible for the operation or changing prices of
            independent providers.
          </p>
          <p>
            Nothing here excludes liability that cannot lawfully be excluded, misrepresents the
            product, or limits mandatory consumer rights or remedies. Applicable consumer
            protections continue to apply. These terms do not introduce mandatory arbitration, waive
            your legal rights or select an exclusive foreign court.
          </p>
        </>,
      ],
      [
        'updates',
        'Updates, privacy and questions',
        <>
          <p>
            We may revise these website terms as the project changes, with an updated date and
            appropriate notice of material changes. Changes do not retroactively authorize charges
            or new data uses. See the <a href="/privacy/">Privacy Policy</a> for data practices.
          </p>
          <p>
            Questions, concerns and reports can be sent to <Email />.
          </p>
        </>,
      ],
    ],
  },
};

export default function LegalPage({ page }) {
  if (page === 'contact')
    return (
      <article className="information-page contact-page container">
        <Eyebrow>NYXR / CONTACT</Eyebrow>
        <h1>Let’s keep in touch.</h1>
        <p>
          Questions, feedback, bug reports, privacy requests or a conversation about NYXR—reach the
          team directly.
        </p>
        <div className="contact-card">
          <span className="plan-kicker">EMAIL THE NYXR TEAM</span>
          <a className="contact-address" href={contactHref}>
            {contactEmail}
            <Icon size={22} />
          </a>
          <p>Your email application opens when you select this address. You choose what to send.</p>
          <Button href={contactHref}>Write an email</Button>
        </div>
        <div className="contact-topics">
          <section>
            <h2>Product & support</h2>
            <p>
              Tell us your NYXR version, what you expected and the steps that reproduce the issue.
              Send sanitized details rather than API keys.
            </p>
          </section>
          <section>
            <h2>Privacy & terms</h2>
            <p>
              Use the same address for data questions or concerns about the{' '}
              <a href="/privacy/">Privacy Policy</a> and <a href="/terms/">Terms and Conditions</a>.
            </p>
          </section>
        </div>
        <p className="contact-response-note">
          NYXR is a developing project. We do not promise a response time or provide emergency
          support through this inbox.
        </p>
      </article>
    );
  const policy = policies[page];
  return (
    <article className="information-page legal-page container">
      <Eyebrow>NYXR / POLICIES</Eyebrow>
      <h1>{policy.title}</h1>
      <p className="policy-updated">Last updated {updated}</p>
      <p className="policy-intro">{policy.intro}</p>
      <nav className="policy-contents" aria-label={`${policy.title} sections`}>
        {policy.sections.map(([id, title], i) => (
          <a key={id} href={`#${page}-${id}`}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            {title}
          </a>
        ))}
      </nav>
      <div className="policy-body">
        {policy.sections.map(([id, title, content], i) => (
          <section id={`${page}-${id}`} key={id}>
            <h2>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {title}
            </h2>
            {content}
          </section>
        ))}
      </div>
      <div className="policy-contact">
        <p>Have a question about this policy?</p>
        <a href={contactHref}>
          {contactEmail} <Icon size={14} />
        </a>
      </div>
    </article>
  );
}
