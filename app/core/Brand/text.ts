/** Visible wallet copy only. API names, interpolation fields and URLs retain their identity. */
export const rebrandVisibleText = (
  input: string,
  name: string,
  previousName = 'MetaMask',
): string => {
  const preserved: string[] = [];
  const text = input.replace(
    /%\{[^}]*\}|\{\{[^}]*\}\}|<[^>]+>|https?:\/\/[^\s"<>]+|@metamask\/[\w-]+/gu,
    (token) => {
      preserved.push(token);
      return `\u0000${preserved.length - 1}\u0000`;
    },
  );
  const escapedPrevious = previousName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  return text
    .replace(/MetaMask USD\s*\(mUSD\)/giu, 'mUSD')
    .replace(/MetaMask USD/giu, 'mUSD')
    .replace(/MetaMask (Card|Rewards|Portfolio|Perps|Predict)/giu, '$1')
    .replace(
      new RegExp(`\\b(?:MetaMask|${escapedPrevious})\\b`, 'giu'),
      () => name,
    )
    .replace(
      /\u0000(\d+)\u0000/gu,
      (_token, index: string) => preserved[Number(index)],
    );
};
