export interface CommonConfig {
  swayName: string;
  swaySymbol: string;
  // make sure url ends with trailing '/'
  swayBaseUri: string;
}

export function getConfig(network: string): CommonConfig {
  const config = {
    swayName: 'Sway',
    swaySymbol: 'SWAY',
  };

  if (network === 'celo') return {swayBaseUri: 'api.swaynft.club/', ...config};
  if (network === 'alfajores')
    return {swayBaseUri: 'api.swaynft.club/', ...config};
  return {swayBaseUri: 'api.swaynft.club/', ...config};
}
