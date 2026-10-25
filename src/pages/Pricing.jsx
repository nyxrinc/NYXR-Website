import { useState } from 'react';
import { providers } from '../data/product';
import {
  comparisons,
  dailyCapSum,
  exampleDays,
  exampleTokens,
  groqSource,
  pricingReviewed,
  providerAllowances,
  tokenExamples,
  gatewayEcosystem,
} from '../data/pricing';
import { Button, Eyebrow } from '../components/Primitives';
import Icon from '../components/Icon';
import { RegionSelector, useRegion } from '../localization/RegionalPreferences';
import {
  plans,
  featureMatrix,
  planFAQs,
  formatPlanPrice,
  planCurrency,
  previewLimits,
} from '../data/plans';
import '../styles/plans.css';

const compactNumber = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
const number = (value) => new Intl.NumberFormat('en').format(value);

function ValueMetrics() {
  return (
    <div className="value-metrics ecosystem-metrics container">
      <div>
        <strong>
          {compactNumber(gatewayEcosystem.monthlyTokens)}
          <span> / tokens per month*</span>
        </strong>
        <p>FreeLLMAPI’s reported catalog potential.</p>
      </div>
      <div>
        <strong>
          {gatewayEcosystem.upstreamProviders}
          <span> / upstream providers*</span>
        </strong>
        <p>In the cited FreeLLMAPI README snapshot.</p>
      </div>
      <div>
        <strong>
          {gatewayEcosystem.modelEndpoints}
          <span> / model endpoints*</span>
        </strong>
        <p>Across its model types; task compatibility varies.</p>
      </div>
      <div>
        <strong>
          {providers.length}
          <span> / NYXR integrations</span>
        </strong>
        <p>Including the gateway and local Ollama.</p>
      </div>
    </div>
  );
}

function EcosystemOverview() {
  return (
    <section
      id="token-calculation"
      className="ecosystem-overview"
      aria-labelledby="ecosystem-title"
    >
      <div className="container value-section-heading ecosystem-heading">
        <Eyebrow>A WHOLE ECOSYSTEM. ONE NYXR WORKSPACE.</Eyebrow>
        <h2 id="ecosystem-title">
          Billions of possibilities.
          <br />
          <span>Cloud choice. Local freedom.</span>
        </h2>
        <p>
          Connect FreeLLMAPI’s broad model catalog, use NYXR’s individual provider integrations, or
          run your own installed models with Ollama.
        </p>
      </div>
      <ValueMetrics />
      <div className="container ecosystem-details">
        <p className="ecosystem-attribution">
          * Publisher-reported potential for personal experimentation. Configured upstream accounts
          required; not a guaranteed personal allowance.{' '}
          <a
            className="source-link"
            href={gatewayEcosystem.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            FreeLLMAPI README <Icon size={12} />
          </a>{' '}
          · Checked {pricingReviewed}.
        </p>
        <div className="ecosystem-routes">
          <article className="ecosystem-gateway">
            <span className="plan-kicker">
              <Icon name="nodes" size={16} /> CONNECTED THROUGH FREELLMAPI
            </span>
            <h3>
              One connection.
              <br />A wider world of models.
            </h3>
            <p>
              The gateway routes among the upstream accounts you configure. NYXR selects compatible
              models and tools for the task.
            </p>
            <div className="ecosystem-route-labels">
              <span>Smart routing</span>
              <span>Automatic failover</span>
              <span>Your provider keys</span>
            </div>
            <a
              className="source-link"
              href={gatewayEcosystem.catalog}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the upstream catalog <Icon size={13} />
            </a>
          </article>
          <article id="ollama" className="ecosystem-local">
            <span className="plan-kicker">
              <Icon name="memory" size={16} /> OLLAMA / BUILT IN
            </span>
            <h3>
              Your models.
              <br />
              Your machine.
            </h3>
            <p>
              Select LOCAL mode, choose an installed Ollama model, and run inference on your own
              hardware. Local inference has no cloud token allowance to consume.
            </p>
            <div className="ecosystem-route-labels">
              <span>Explicit LOCAL mode</span>
              <span>Installed models</span>
              <span>Manual choice</span>
            </div>
            <p className="ecosystem-local-note">
              Limited by your hardware, electricity and model license. Local fallback stays off
              unless you explicitly enable it.
            </p>
            <Button href="/providers/" secondary>
              Explore NYXR integrations
            </Button>
          </article>
        </div>
        <details className="ecosystem-scope">
          <summary>What the headline includes</summary>
          <div>
            <p>
              The 7.4B figure is FreeLLMAPI’s published estimate of catalog-wide free-tier
              potential. It is not independently measured NYXR capacity, a shared credit balance or
              a guaranteed monthly grant. Its cited README counts endpoints across several model
              types; not every endpoint supports chat or coding.
            </p>
            <p>
              Groq, Gemini, Mistral, OpenRouter, NVIDIA and Z.AI already appear among its upstreams.
              Connecting the same account directly adds flexibility, not a second allowance. We do
              not add those quotas again or claim {providers.length} +{' '}
              {gatewayEcosystem.upstreamProviders} distinct providers.
            </p>
            <p>
              Your keys, eligibility, catalog version, model compatibility and actual limits
              determine access. FreeLLMAPI describes personal experimentation, with variable
              availability and no production guarantee. Its free catalog snapshot trails the live
              feed by {gatewayEcosystem.freeSnapshotLagDays} days; the optional live feed is paid.
              Its website and catalog show different counts, so these are labeled as a README
              snapshot.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

function PricingComparison() {
  const { formatMoney } = useRegion();
  return (
    <section className="value-comparison container" aria-labelledby="comparison-title">
      <div className="value-section-heading">
        <Eyebrow>MORE ROOM FOR YOUR IDEAS</Eyebrow>
        <h2 id="comparison-title">
          Keep your budget.
          <br />
          <span>Build your next thing.</span>
        </h2>
        <p>
          Paid coding plans can add up. NYXR brings your providers into one desktop workspace, with
          no NYXR subscription required for Core.
        </p>
      </div>
      <div className="comparison-grid">
        <article className="comparison-card nyxr-plan">
          <div className="plan-kicker">
            <span className="status-dot" /> THE NYXR WAY
          </div>
          <h3>NYXR</h3>
          <div className="plan-price">
            {formatMoney(0)}
            <small>NYXR software fee</small>
          </div>
          <p>
            Bring your own provider. Start with eligible free routes. Choose paid APIs only when you
            want to.
          </p>
          <ul>
            <li>
              <Icon name="check" size={14} /> {providers.length} provider integrations
            </li>
            <li>
              <Icon name="check" size={14} /> Chat, code, voice and computer tools
            </li>
            <li>
              <Icon name="check" size={14} /> Local mode when you choose it
            </li>
          </ul>
          <Button href="/download/">Explore the Windows beta</Button>
          <span className="plan-footnote">
            In development. Free quotas belong to your provider accounts.
          </span>
        </article>
        {comparisons.map((item) => (
          <article className="comparison-card" key={item.name}>
            <div className="plan-kicker">PAID PLAN EXAMPLE</div>
            <h3>{item.name}</h3>
            <div className="plan-price">
              US${item.usd}
              <small>per month · USD list price</small>
            </div>
            <span className="comparison-plan-name">{item.plan}</span>
            <p>{item.description}</p>
            <a className="source-link" href={item.source} target="_blank" rel="noopener noreferrer">
              {item.link} <Icon size={13} />
            </a>
          </article>
        ))}
      </div>
      <div className="comparison-notes">
        <p>
          Compare the pricing model, not identical entitlements. NYXR does not include Codex or
          Claude Code subscriptions, promise the same models, or replace provider billing.
          Competitor figures are official US-dollar list prices, not converted local quotes; taxes
          and regional pricing may differ.
        </p>
        <span>CHECKED {pricingReviewed}</span>
      </div>
    </section>
  );
}

function TokenCalculation() {
  const [days, setDays] = useState(exampleDays);
  return (
    <details className="groq-example container">
      <summary>
        A smaller worked example: three Groq model caps{' '}
        <span>
          {compactNumber(exampleTokens)} / {exampleDays} days
        </span>
      </summary>
      <section id="groq-calculation" className="token-calculation" aria-labelledby="tokens-title">
        <div className="value-section-heading">
          <Eyebrow>THE NUMBERS, WITH THE WORKING SHOWN</Eyebrow>
          <h2 id="tokens-title">
            A smaller example.
            <br />
            <span>Three Groq models.</span>
          </h2>
          <p>
            The earlier 18M figure came from these three daily model caps over 30 days. This is a
            subset of the broader gateway ecosystem, not NYXR’s total, and must not be added to the
            FreeLLMAPI estimate again.
          </p>
        </div>
        <div className="token-workbench">
          <div className="token-result">
            <span className="plan-kicker">PUBLISHED MODEL-CAP SUM</span>
            <output aria-live="polite">
              {compactNumber(dailyCapSum * days)}
              <small>tokens / {days === 1 ? 'day' : `${days}-day example`}</small>
            </output>
            <div className="period-options" role="group" aria-label="Token example period">
              {[1, 7, 30].map((value) => (
                <button key={value} aria-pressed={days === value} onClick={() => setDays(value)}>
                  {value} {value === 1 ? 'day' : 'days'}
                </button>
              ))}
            </div>
            <p>
              {number(dailyCapSum)} daily cap sum × {days} {days === 1 ? 'day' : 'days'} ={' '}
              {number(dailyCapSum * days)} tokens.
            </p>
          </div>
          <div className="token-models">
            <div className="token-model-row token-model-head">
              <span>GROQ FREE PLAN / TEXT</span>
              <span>DAILY CAP</span>
            </div>
            {tokenExamples.map((item) => (
              <div className="token-model-row" key={item.model}>
                <code>{item.model}</code>
                <strong>{compactNumber(item.dailyTokens)}</strong>
              </div>
            ))}
            <a className="source-link" href={groqSource} target="_blank" rel="noopener noreferrer">
              Published Groq rate limits <Icon size={13} />
            </a>
            <p>
              Input and output token caps. Organization/model limits, requests per day, throughput
              and availability may reduce what you can actually use. Model budgets remain separate;
              this sum is not a pooled grant or guaranteed capacity.
            </p>
          </div>
        </div>
        <div className="total-explainer">
          <Icon name="nodes" size={22} />
          <div>
            <h3>A worked cap sum, not a second allowance</h3>
            <p>
              Some providers publish request limits, some use money-based credits, some have
              temporary trials, and others show quotas only inside your account. We don’t convert
              those into invented tokens, multiply per-minute throughput into monthly allowances, or
              count gateway access twice.
            </p>
          </div>
        </div>
      </section>
    </details>
  );
}

export function ProviderLedger() {
  const [filter, setFilter] = useState('all');
  const rows = providerAllowances.filter(
    (row) =>
      filter === 'all' ||
      (filter === 'free'
        ? ['free', 'gateway'].includes(row.category)
        : !['free', 'gateway'].includes(row.category)),
  );
  return (
    <section className="allowance-ledger container" aria-labelledby="allowance-title">
      <div className="ledger-heading">
        <div>
          <Eyebrow>EVERY CONNECTION, CLEARLY</Eyebrow>
          <h2 id="allowance-title">
            {providers.length} integrations.
            <br />
            <span>Your choice of how to run.</span>
          </h2>
        </div>
        <p>
          Free access, trials, account quotas and local compute—each labeled for what it actually
          is. Checked {pricingReviewed}.
        </p>
      </div>
      <div className="ledger-filters" role="group" aria-label="Filter provider allowances">
        {[
          ['all', `All ${providers.length}`],
          ['free', 'Free access / allowances'],
          ['other', 'Trials, billing & local'],
        ].map(([value, label]) => (
          <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="allowance-list">
        {rows.map((row) => (
          <article className="allowance-row" key={row.name}>
            <div className="allowance-provider">
              <span className={`allowance-type type-${row.category}`}>{row.type}</span>
              <h3>{row.name}</h3>
            </div>
            <div className="allowance-description">
              <h4>{row.allowance}</h4>
              <p>{row.detail}</p>
              <span className="allowance-contribution">{row.contribution}</span>
            </div>
            <div>
              {row.source ? (
                <a
                  href={row.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                  aria-label={`${row.name} official documentation`}
                >
                  Source <Icon size={13} />
                </a>
              ) : (
                <span className="ledger-local-note">Configured locally</span>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="ledger-footer-note">
        This is a public documentation snapshot, not a live account balance. Provider terms,
        regional eligibility, model availability and limits can change. Connect your own eligible
        accounts in NYXR.
      </p>
    </section>
  );
}

function ProductPlans() {
  const [previewId, setPreviewId] = useState('core');
  const preview = plans.find((plan) => plan.id === previewId);
  const selectPreview = (id, scroll = false) => {
    setPreviewId(id);
    if (scroll)
      requestAnimationFrame(() =>
        document
          .getElementById('plan-preview')
          ?.scrollIntoView({ block: 'nearest', behavior: 'instant' }),
      );
  };
  return (
    <section id="plans" className="plans-section container" aria-labelledby="plans-title">
      <header className="plans-heading">
        <h2 id="plans-title">Start with Core. Grow on your terms.</h2>
        <p>Paid plan preview · Planned monthly prices in INR</p>
      </header>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`tier-card tier-${plan.id}`}
            aria-labelledby={`tier-${plan.id}`}
            data-plan={plan.id}
          >
            <span className="tier-status">
              {plan.available && <span className="status-dot" />}
              {plan.available ? 'FREE CORE' : plan.status || 'PLANNED / PREVIEW'}
            </span>
            <h3 id={`tier-${plan.id}`}>{plan.name}</h3>
            <span className="tier-label">{plan.label}</span>
            <div className="tier-price" data-price-currency={planCurrency}>
              <strong>{formatPlanPrice(plan.price)}</strong>
              <span>{planCurrency}</span>
            </div>
            <span className="tier-period">{plan.period}</span>
            <p className="tier-description">{plan.description}</p>
            <ul className="tier-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" size={14} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="tier-footer">
              {plan.available ? (
                <Button href={plan.href} icon="download">
                  {plan.cta}
                </Button>
              ) : (
                <Button
                  disabled
                  secondary
                  icon="timeline"
                  aria-label={`${plan.name}: ${plan.cta}`}
                  aria-describedby={`note-${plan.id}`}
                >
                  {plan.cta}
                </Button>
              )}
              <button
                type="button"
                className="tier-preview-button"
                aria-label={`Preview ${plan.name}`}
                aria-pressed={previewId === plan.id}
                aria-controls="plan-preview"
                onClick={() => selectPreview(plan.id, true)}
              >
                Preview plan <Icon name="arrow" size={14} />
              </button>
              <p className="tier-note" id={`note-${plan.id}`}>
                {plan.note}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="plans-availability">
        <Icon name="shield" size={20} />
        <p>
          <strong>Core stays free. Paid services are coming soon.</strong> Production paid accounts,
          payments and cloud storage are not configured. Teams has implemented beta foundations;
          hosted access awaits account service configuration. No checkout is live and no charges are
          being taken. Future billing is INR-only; checkout must verify billing country and confirm
          the server price, taxes and final total before any purchase.
        </p>
      </div>
      <section
        id="plan-preview"
        className="plans-preview"
        aria-labelledby="plan-preview-title"
        data-preview-plan={previewId}
      >
        <div className="plans-preview-heading">
          <div>
            <span className="plan-kicker">TRY THE COMPARISON</span>
            <h3 id="plan-preview-title">{preview.name} preview</h3>
          </div>
          <span className="plans-preview-price">
            {formatPlanPrice(preview.price)} <small>INR · {preview.period}</small>
          </span>
        </div>
        <p className="plans-preview-banner" role="status">
          Preview only — no subscription or charge. Viewing {preview.name}.
        </p>
        <div className="plans-preview-options" role="group" aria-label="Choose a plan to preview">
          {plans.map((plan) => (
            <button
              type="button"
              key={plan.id}
              aria-pressed={previewId === plan.id}
              onClick={() => selectPreview(plan.id)}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <dl className="plans-preview-limits">
          {previewLimits(preview).map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="plans-preview-note">
          {preview.note} This comparison is temporary page UI; it resets on reload and creates no
          account or entitlement. Local storage uses your own disk, not the cloud allowance shown
          here.
        </p>
      </section>
    </section>
  );
}

function TeamsFoundations() {
  return (
    <section
      className="teams-foundations container"
      id="teams-beta"
      aria-labelledby="teams-foundations-title"
    >
      <Eyebrow>TEAMS / BETA FOUNDATIONS</Eyebrow>
      <h2 id="teams-foundations-title">A shared place to move work forward.</h2>
      <p className="teams-foundations-intro">
        Collaboration for explicitly selected text files, shared Macro libraries through JSON
        export/import, permissions and activity / audit history have implemented beta foundations in
        the current source. Hosted availability is pending production account service configuration.
        Automatic whole-folder sync and binary-file sharing are not supported.
      </p>
      <div className="teams-foundations-grid">
        {[
          [
            'folder',
            'Choose the text files to share',
            'Workspace and membership foundations support explicitly chosen text files. You decide which files enter the shared workspace.',
          ],
          [
            'route',
            'Shared Macro libraries',
            'Share reusable Macros through JSON export/import, governed by workspace permissions and audit records.',
          ],
          [
            'shield',
            'Workspace permissions',
            'Permissions define who can access and manage shared workspace content.',
          ],
          [
            'timeline',
            'Activity & audit history',
            'Activity and audit records provide a history of shared-file and Macro changes in the workspace.',
          ],
        ].map(([icon, title, description]) => (
          <article key={title}>
            <Icon name={icon} size={23} />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="plans-availability">
        <Icon name="timeline" size={20} />
        <p>
          <strong>Hosted access pending.</strong> Public Teams workspaces and hosted NYXR sign-in
          have not launched. Account services must be configured before hosted collaboration can
          become available. Payments remain inactive; Teams is a planned INR price per seat per
          month.
        </p>
      </div>
      <a className="text-link" href="#plans">
        View planned Teams pricing <Icon size={16} />
      </a>
    </section>
  );
}

function PlanComparison() {
  return (
    <section className="plans-matrix-section container" aria-labelledby="plans-matrix-title">
      <header className="plans-heading">
        <h2 id="plans-matrix-title">The workspace is yours. The extras are optional.</h2>
      </header>
      <div
        className="plans-matrix-scroll"
        role="region"
        aria-label="Compare NYXR plan features"
        tabIndex={0}
      >
        <table className="plans-matrix">
          <caption>
            Core features stay free in every plan. Write for me is included in beta 3.
            Cloud services are planned; Teams beta foundations await
            hosted account service configuration.
          </caption>
          <thead>
            <tr>
              <th scope="col">What you get</th>
              {plans.map((plan) => (
                <th scope="col" key={plan.id}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((feature) => (
              <tr key={feature.label}>
                <th scope="row">{feature.label}</th>
                {feature.values.map((value, index) => (
                  <td
                    key={plans[index].id}
                    className={value === 'Included' || value === 'None' ? 'is-included' : undefined}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="plans-scroll-hint">
        On smaller screens, scroll the comparison sideways. Provider charges and quotas are separate
        from every NYXR plan.
      </p>
    </section>
  );
}

export default function Pricing() {
  return (
    <div className="nyxr-plans">
      <section className="pricing-intro plans-intro container">
        <div>
          <Eyebrow>YOUR WORKSPACE. YOUR CHOICE.</Eyebrow>
          <h1>
            The core stays free.
            <br />
            <span>Go further, together.</span>
          </h1>
          <p>
            Chat, code, automate and learn in one local workspace. Start with free Core; optional
            cloud backup and device sync are planned. Teams collaboration has implemented beta
            foundations, with hosted access pending account service configuration.
          </p>
          <div className="button-row">
            <Button href="/download/" icon="download">
              Download Core
            </Button>
            <Button href="#plans" secondary>
              Compare plans
            </Button>
          </div>
        </div>
        <aside className="pricing-region">
          <span className="plan-kicker">YOUR REGION, CLEAR PRICING</span>
          <RegionSelector />
          <small>
            Plan prices are shown in INR. Your display preference does not convert these prices or
            verify your billing country. Future billing is INR-only. Checkout must verify billing
            country and confirm the authoritative server price, taxes and final total.
          </small>
        </aside>
      </section>
      <ProductPlans />
      <div className="plans-principles container">
        <div>
          <h3>Your local tools stay free</h3>
          <p>
            No NYXR-imposed local token quota. Your hardware and model license determine local
            capacity.
          </p>
        </div>
        <div>
          <h3>Your provider, your account</h3>
          <p>
            BYOK provider charges and allowances remain separate. No NYXR plan includes an AI credit
            balance.
          </p>
        </div>
        <div>
          <h3>Your backup, your decision</h3>
          <p>
            Future encrypted backups are opt-in. Provider keys stay local and are excluded from
            planned cloud backups.
          </p>
        </div>
      </div>
      <TeamsFoundations />
      <PlanComparison />
      <section className="plans-faq container" aria-labelledby="plans-faq-title">
        <Eyebrow>A FEW THINGS, MADE CLEAR</Eyebrow>
        <h2 id="plans-faq-title">Before you choose.</h2>
        {planFAQs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      <section
        className="plans-provider-section"
        aria-label="Separate provider pricing disclosures"
      >
        <details className="plans-provider-details">
          <summary className="container">
            <div>
              <h2>Provider allowances &amp; sources</h2>
              <p>
                A separate look at provider accounts, free tiers and published limits. These are not
                NYXR plan entitlements or guaranteed credits.
              </p>
            </div>
            <Icon name="chevron" size={22} />
          </summary>
          <div className="plans-provider-content">
            <EcosystemOverview />
            <TokenCalculation />
            <PricingComparison />
            <ProviderLedger />
          </div>
        </details>
      </section>
    </div>
  );
}
