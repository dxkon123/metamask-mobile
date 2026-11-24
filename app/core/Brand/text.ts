/** Visible wallet copy only. API names, interpolation fields and URLs retain their identity. */
export const rebrandVisibleText = (
  input: string,
  name: string,
  previousName = 'MetaMask',
): string => {
  const escapedPrevious = previousName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  return input
    .split(
      /(%\{[^}]*\}|\{\{[^}]*\}\}|<[^>]+>|https?:\/\/[^\s"<>]+|@metamask\/[\w-]+)/gu,
    )
    .map((part, index) =>
      index % 2 === 1
        ? part
        : part
            .replace(/MetaMask USD\s*\(mUSD\)/giu, 'mUSD')
            .replace(/MetaMask USD/giu, 'mUSD')
            .replace(/MetaMask (Card|Rewards|Portfolio|Perps|Predict)/giu, '$1')
            .replace(
              new RegExp(`\\b(?:MetaMask|${escapedPrevious})\\b`, 'giu'),
              () => name,
            ),
    )
    .join('');
};
