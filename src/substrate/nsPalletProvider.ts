import { signAndSendTx } from './txHandler';
import { getAccountAddress } from './utils';
import { blake2AsHex } from '@polkadot/util-crypto';
import { numberToU8a, stringToU8a, hexToU8a } from '@polkadot/util';

interface NameServiceConstants {
  commitmentDeposit: number;
  nameDeposit: number;
  tierThreeLetters: number;
  tierFourLetters: number;
  tierDefault: number;
  blocksPerRegistrationPeriod: number;
  notificationPeriod: number;
  feePerRegistrationPeriod: number;
}

class NameServiceProvider {
  apiClient;
  constants: any = {};
  constructor(api) {
    this.apiClient = api;
  }
  initialize() {
    this.constants.commitmentDeposit =
      this.apiClient.consts.nameService?.commitmentDeposit;
    this.constants.nameDeposit =
      this.apiClient.consts.nameService?.commitmentDeposit;
    this.constants.tierThreeLetters =
      this.apiClient.consts.nameService?.tierThreeLetters;
    this.constants.tierFourLetters =
      this.apiClient.consts.nameService?.tierFourLetters;
    this.constants.tierDefault = this.apiClient.consts.nameService?.tierDefault;
    this.constants.blocksPerRegistrationPeriod =
      this.apiClient.consts.nameService?.blocksPerRegistrationPeriod;
    this.constants.notificationPeriod =
      this.apiClient.consts.nameService?.notificationPeriod;
    this.constants.feePerRegistrationPeriod =
      this.apiClient.consts.nameService?.feePerRegistrationPeriod;
    console.log(this.constants);
  }

  generateCommitHashBytes = (name: string, secret: number) => {
    const nameU8a: Uint8Array = stringToU8a(name);
    const secretU8a: Uint8Array = numberToU8a(secret);
    const saltedNameU8a: Uint8Array = new Uint8Array(
      nameU8a.length + secretU8a.length
    );

    saltedNameU8a.set(nameU8a);
    saltedNameU8a.set(secretU8a, nameU8a.length);
    console.log(saltedNameU8a);
    const hash = blake2AsHex(saltedNameU8a);
    console.log(name, secret, hash);
    return hash;
  };

  generateCommitmentHashCodec = (name: string, secret: number) => {
    const preimage = this.apiClient.createType('CommitmentRaw', [name, secret]);
    const hash = blake2AsHex(preimage.toU8a());
    console.log(name, secret, hash);
    return hash;
  };

  generateNameHash = (name: string) => {
    const hash = blake2AsHex(name);
    return hash;
  };

  async getCommitment(commitmentHash) {
    return this.apiClient.query.nameService.commitments(commitmentHash);
  }

  async getRegistration(name) {
    const nameHash = this.generateNameHash(name);
    return this.apiClient.query.nameService.registrations(nameHash);
  }

  async getResolver(name) {
    const nameHash = this.generateNameHash(name);
    return this.apiClient.query.nameService.resolvers(nameHash);
  }

  async commit(account, commitmentHash) {
    let address = getAccountAddress(account);
    let commitTx = await this.apiClient.tx.nameService.commit(
      address,
      commitmentHash
    );
    console.log('tx');
    console.log(address);
    return signAndSendTx(this.apiClient, commitTx, account, true);
  }

  async reveal(account, name, secret, periods) {
    let revealTx = this.apiClient.tx.nameService.reveal(name, secret, periods);
    return signAndSendTx(this.apiClient, revealTx, account);
  }

  async renew(account, name, periods) {
    const nameHash = this.generateNameHash(name);
    let renewTx = this.apiClient.tx.nameService.renew(nameHash, periods);
    return signAndSendTx(this.apiClient, renewTx, account);
  }
}

export default NameServiceProvider;
