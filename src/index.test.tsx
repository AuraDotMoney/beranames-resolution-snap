import { beforeAll, describe, expect, it } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

const BARTIO_ID = 'eip155:80084';
let onNameLookup: any;

beforeAll(async () => {
  const snap = await installSnap();
  onNameLookup = snap.onNameLookup;
});

describe('onNameLookup', () => {
  describe('with .bera domain', () => {
    it('returns the address for existing domain', async () => {
      const request = {
        domain: 'gio.bera',
        chainId: BARTIO_ID,
      };

      const response: any = await onNameLookup(request);

      const result = response.response.result;
      expect(result).toEqual({
        resolvedAddresses: [
          {
            resolvedAddress: '0xb245E730Afaf476260E061B177f86D3D062A3023',
            protocol: 'Beranames',
            domainName: 'gio.bera',
          },
        ],
      });
    });

    describe('with non existing .bera domain', () => {
      it('returns null for non-existent .bera domain', async () => {
        const request = {
          domain: 'nonexistentasdfasdfasdfasdfasdfasdfasdf.bera',
          chainId: BARTIO_ID,
        };

        const response: any = await onNameLookup(request);
        const result = response.response.result;

        expect(result).toEqual(null);
      });
    });
  });

  describe('with .🐻⛓️ domain', () => {
    it('returns the address for existing domain', async () => {
      const request = {
        domain: 'gio.🐻⛓️',
        chainId: BARTIO_ID,
      };

      const response: any = await onNameLookup(request);
      const result = response.response.result;

      expect(result).toEqual({
        resolvedAddresses: [
          {
            resolvedAddress: '0xb245E730Afaf476260E061B177f86D3D062A3023',
            protocol: 'Beranames',
            domainName: 'gio.bera',
          },
        ],
      });
    });

    describe('with non existing .🐻⛓️ domain', () => {
      it('returns null for non-existent .🐻⛓️ domain', async () => {
        const request = {
          domain: 'nonexistentasdfasdfasdfasdfasdfasdfasdf.🐻⛓️',
          chainId: BARTIO_ID,
        };
  
        const response: any = await onNameLookup(request);
        const result = response.response.result;
  
        expect(result).toEqual(null);
      });
    });
  });
});
