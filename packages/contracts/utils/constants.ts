import {CONFIGS, SwayConfig, SwayNetworkNames} from '@sway/common/src/config';

export function getConfig(network: string): SwayConfig {
  if (!(network in SwayNetworkNames))
    throw new Error(`Network ${network} not found in SwayNetworkNames`);

  return CONFIGS[network as SwayNetworkNames];
}
