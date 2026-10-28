// Independent of the public companion's account, compatibility and hardware gates.
// Only this projection may enter the website bundle or public exhibition manifest.
const fingerprint = (value) =>
  typeof value === 'string' && /^[a-f0-9]{64}$/.test(value) && !/^([a-f0-9])\1{63}$/.test(value);

export function exhibitionAssetUrl(value, filename, tag) {
  if (typeof value !== 'string' || !value || /[\s\\%?#\u0000-\u001f\u007f]/.test(value))
    throw new Error(
      'Exhibition assets require a permanent HTTPS URL without escapes or credentials',
    );
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Invalid exhibition asset URL');
  }
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    !url.hostname.includes('.') ||
    /[\[\]:]/.test(url.hostname) ||
    /^[\d.]+$/.test(url.hostname) ||
    /(^|\.)(localhost|local|internal|lan|home|invalid)$/.test(url.hostname) ||
    url.hostname.endsWith('.') ||
    !url.pathname.endsWith(`/${tag}/${filename}`) ||
    /\/(?:latest|\.\.?)(?:\/|$)/i.test(value) ||
    url.href !== value
  )
    throw new Error(
      'Exhibition assets require a permanent public HTTPS URL with the matching tag and filename',
    );
  return url.href;
}

export function normalizeExhibitionRelease(record) {
  if (
    record?.schemaVersion !== 1 ||
    record.channel !== 'exhibition-test' ||
    typeof record.version !== 'string' ||
    !/^\d+\.\d+\.\d+-beta\.\d+$/.test(record.version) ||
    record.tag !== `exhibition-${record.version}` ||
    record.applicationId !== 'com.nyxr.companion.exhibition' ||
    record.minAndroid !== 10 ||
    (record.edition !== undefined && !['full', 'basic'].includes(record.edition)) ||
    typeof record.available !== 'boolean' ||
    typeof record.signed !== 'boolean'
  )
    throw new Error('Invalid exhibition channel, version, tag or Android identity');

  const asset = (value, filename, android = false) => {
    if (value == null) return null;
    if (
      value.filename !== filename ||
      !Number.isSafeInteger(value.bytes) ||
      value.bytes <= 0 ||
      !fingerprint(value.sha256) ||
      (android &&
        (!fingerprint(value.signingCertificateSha256) ||
          typeof value.signatureVerified !== 'boolean'))
    )
      throw new Error('Invalid exhibition asset filename, bytes, SHA-256 or signing certificate');
    return {
      filename,
      bytes: value.bytes,
      sha256: value.sha256,
      url: exhibitionAssetUrl(value.url, filename, record.tag),
      ...(android ? { signingCertificateSha256: value.signingCertificateSha256 } : {}),
    };
  };
  const apk = asset(record.apk, `NYXR-Exhibition-${record.version}.apk`, true);
  const source = asset(record.source, `NYXR-Exhibition-source-${record.version}.zip`);
  if (
    record.available &&
    !(record.signed && record.apk?.signatureVerified === true && apk && source)
  )
    throw new Error(
      'Exhibition download requires a verified signed APK and matching hosted source',
    );

  return {
    schemaVersion: 1,
    channel: 'exhibition-test',
    edition: record.edition ?? 'full',
    version: record.version,
    tag: record.tag,
    applicationId: record.applicationId,
    minAndroid: 10,
    available: record.available,
    signed: record.available && record.signed,
    status: 'testing',
    hardwareAccepted: false,
    apk: record.available ? apk : null,
    source: record.available ? source : null,
  };
}
