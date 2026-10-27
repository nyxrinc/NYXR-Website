import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Current multi-page production gates. The original one-page scrolling fixtures
// in qa.mjs/ui-state.mjs/finish_checks.mjs predate page routing. NEXUS covers
// theme selection in normal and reduced motion against actual built pages.
for (const suite of [
  'qa-deployment.mjs',
  'qa-nexus.mjs',
  'qa-plans.mjs',
  'qa-companion.mjs',
  'qa-refresh.mjs',
  'qa-exhibition.mjs',
]) {
  console.log(`\nNYXR QA / ${suite}`);
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(suite, import.meta.url))], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    stdio: 'inherit',
    env: process.env,
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    console.error(result.error?.message || `${suite} failed`);
    process.exitCode = result.status || 1;
    break;
  }
}
