import type { OnNameLookupHandler } from '@metamask/snaps-sdk';
import { createPublicClient, http } from 'viem';
import { berachainTestnetbArtio } from 'viem/chains';
import { normalize } from 'viem/ens';

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, address } = request;
  let { domain } = request;

  if (!domain) {
    return null;
  }

  // if domain ends with .🐻⛓️, replace it with .bera
  if (domain.endsWith('.🐻⛓️')) {
    domain = domain.replace('.🐻⛓️', '.bera');
  }

  // Create a public client
  const client = createPublicClient({
    chain: berachainTestnetbArtio,
    transport: http(),
  });

  // Get ENS address using viem
  const resolvedAddress = await client.getEnsAddress({
    name: normalize(domain),
  });

  if (!resolvedAddress) {
    return null;
  }

  return {
    resolvedAddresses: [
      {
        resolvedAddress,
        protocol: 'Beranames',
        domainName: domain,
      },
    ],
  };
};
