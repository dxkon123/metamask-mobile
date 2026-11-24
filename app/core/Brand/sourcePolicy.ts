/** Only reviewed display contexts may be changed by the reusable generator. */
export const isDisplaySourceFile = (path: string): boolean =>
  /\.[jt]sx?$/u.test(path) &&
  !/test|spec|mock|fixture|stories|generated|webview|(?:^|\/)(?:services|providers|hooks|utils|constants)(?:\/|\.)/iu.test(
    path,
  );

export const isDisplayLiteral = (
  kind: 'jsxText' | 'jsxAttribute' | 'property' | 'other',
  name: string | undefined,
  text: string,
): boolean => {
  if (
    /window\.|document\.|=>|https?:\/\/|[\w-]+\.(?:io|com|org|app|link)\b/iu.test(
      text,
    )
  )
    return false;
  if (kind === 'jsxText') return true;
  const labels = new Set([
    'title',
    'description',
    'label',
    'placeholder',
    'accessibilityLabel',
    'accessibilityHint',
    'message',
    'pageTitle',
  ]);
  return (
    (kind === 'jsxAttribute' || kind === 'property') &&
    name !== undefined &&
    labels.has(name) &&
    !/[\n\r]/u.test(text)
  );
};
