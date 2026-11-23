/** Avoid SDK startup/settings requests until the owner supplies an analytics key. */
export const hasConfiguredSegmentKey = (
  writeKey: string | undefined,
): boolean => typeof writeKey === 'string' && writeKey.trim().length > 0;
