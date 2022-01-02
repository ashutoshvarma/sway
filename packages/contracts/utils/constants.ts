export interface CommonConfig {
  swayBaseUriExtension: string;
  swayName: string;
  swaySymbol: string;
  // make sure url ends with trailing '/'
  swayBaseUri: string;
}

export function getConfig(network: string): CommonConfig {
  const config = {
    swayName: 'Sway',
    swaySymbol: 'SWAY',
    swayBaseUriExtension: '',
  };

  if (network === 'celo')
    return {swayBaseUri: 'https://static.sway.community/metadata/', ...config};
  if (network === 'alfajores')
    return {swayBaseUri: 'https://static.sway.community/metadata/', ...config};
  return {swayBaseUri: 'https://static.sway.community/metadata/', ...config};
}
