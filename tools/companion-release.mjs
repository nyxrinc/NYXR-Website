import { publicAssetUrl } from './release-config.mjs';

const hash = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
export const companionAcceptanceChecks = [
  'same_wifi_pairing',
  'sms_notification_reply',
  'whatsapp_notification_reply',
  'whatsapp_new_message_handoff',
  'permission_revocation',
  'quota_enforcement',
];

// This is an independent release gate. Missing companion metadata must never
// disable an already published Windows installer or imply it supports phones.
export function createCompanion(record, desktop, env = {}) {
  const pending = {
    available: false,
    status: 'coming-beta',
    channel: 'private-beta',
    minAndroid: 10,
    version: null,
    apk: null,
    desktopCompatible: false,
    hardwareAccepted: false,
  };
  const value = record.companion;
  if (value == null) return pending;
  if (value.schemaVersion !== 1 || value.channel !== 'private-beta' || value.minAndroid !== 10)
    throw new Error('Unsupported Android companion metadata; private beta requires Android 10+');

  let apk = null;
  if (value.apk != null) {
    if (
      typeof value.version !== 'string' ||
      !/^\d+\.\d+\.\d+(?:-beta\.\d+)?$/.test(value.version) ||
      value.apk.filename !== `NYXR-Companion-${value.version}.apk` ||
      !Number.isSafeInteger(value.apk.bytes) ||
      value.apk.bytes <= 0 ||
      !hash(value.apk.sha256) ||
      !hash(value.apk.signingCertificateSha256)
    )
      throw new Error(
        'Invalid companion APK version, filename, size, SHA-256 or signing certificate',
      );
    const url = publicAssetUrl(env.NYXR_COMPANION_APK_URL ?? value.apk.url, value.apk.filename);
    apk = {
      filename: value.apk.filename,
      bytes: value.apk.bytes,
      sha256: value.apk.sha256,
      signingCertificateSha256: value.apk.signingCertificateSha256,
      url,
    };
  }
  const capability = record.phoneCompanion;
  const compatibility = value.desktop;
  const desktopCompatible = Boolean(
    desktop.available &&
    capability?.ready === true &&
    Number.isSafeInteger(capability.protocolVersion) &&
    capability.protocolVersion > 0 &&
    compatibility?.protocolVersion === capability.protocolVersion &&
    compatibility.version === desktop.version &&
    compatibility.installerSha256 === desktop.installer.sha256,
  );
  const acceptance = value.hardwareAcceptance;
  const hardwareAccepted = Boolean(
    apk &&
    desktopCompatible &&
    acceptance?.passed === true &&
    acceptance.apkSha256 === apk.sha256 &&
    acceptance.desktopInstallerSha256 === desktop.installer.sha256 &&
    typeof acceptance.device === 'string' &&
    /\bmotorola\b/i.test(acceptance.device) &&
    Number.isSafeInteger(acceptance.androidApiLevel) &&
    acceptance.androidApiLevel >= 29 &&
    typeof acceptance.testedAt === 'string' &&
    /^\d{4}-\d{2}-\d{2}T/.test(acceptance.testedAt) &&
    Number.isFinite(Date.parse(acceptance.testedAt)) &&
    companionAcceptanceChecks.every((check) => acceptance.checks?.[check] === true),
  );
  const available = Boolean(
    value.distributionReady === true &&
    value.signed === true &&
    value.apk?.signatureVerified === true &&
    apk?.url &&
    desktopCompatible &&
    hardwareAccepted,
  );
  // Explicit projection: release owners' local evidence, paths and notes stay private.
  return {
    ...pending,
    available,
    status: available ? 'private-beta' : 'coming-beta',
    version: available ? value.version : null,
    apk: available ? apk : null,
    desktopCompatible,
    hardwareAccepted,
  };
}
