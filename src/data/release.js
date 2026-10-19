// Only the explicitly selected public release fields are injected by Vite.
export const betaRelease = __NYXR_BETA_RELEASE__;
export const betaSize = `${(betaRelease.installer.bytes / 1_000_000).toFixed(0)} MB`;
