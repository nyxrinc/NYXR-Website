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
          no NYXR subscription required today.
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

export default function Pricing() {
  const { formatMoney } = useRegion();
  return (
    <>
      <section className="pricing-intro container">
        <div>
          <Eyebrow>POWER WITHOUT THE EXTRA SUBSCRIPTION</Eyebrow>
          <h1>
            Big ideas.
            <br />
            <span>A {formatMoney(0)} starting point.</span>
          </h1>
          <p>
            Your desktop AI workspace, with {providers.length} provider integrations and no NYXR fee
            today. Use eligible free tiers, bring your own accounts, and keep control of what you
            spend.
          </p>
          <div className="button-row">
            <Button href="/download/">Get release information</Button>
            <Button href="#token-calculation" secondary>
              Explore the free tiers
            </Button>
          </div>
        </div>
        <aside className="pricing-region">
          <span className="plan-kicker">A LITTLE MORE LOCAL</span>
          <RegionSelector />
          <small>
            NYXR’s zero fee is shown in your chosen currency. Paid provider prices remain in their
            published currency. Future checkout will confirm country, currency and tax separately.
          </small>
        </aside>
      </section>
      <EcosystemOverview />
      <TokenCalculation />
      <PricingComparison />
      <ProviderLedger />
    </>
  );
}
