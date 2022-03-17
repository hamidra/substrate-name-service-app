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
}

class NameServiceProvider {
  apiClient;
  constants: any = {};
  constructor(api) {
    this.apiClient = api;
  }
  initialize() {
    this.constants.commitmentDeposit =
      this.apiClient.consts.nameService?.commitmentDeposit?.toHuman();
    this.constants.nameDeposit =
      this.apiClient.consts.nameService?.commitmentDeposit?.toHuman();
    this.constants.tierThreeLetters =
      this.apiClient.consts.nameService?.tierThreeLetters?.toHuman();
    this.constants.tierFourLetters =
      this.apiClient.consts.nameService?.tierFourLetters?.toHuman();
    this.constants.tierDefault =
      this.apiClient.consts.nameService?.tierDefault?.toHuman();
    this.constants.blocksPerRegistrationPeriod =
      this.apiClient.consts.nameService?.blocksPerRegistrationPeriod?.toHuman();
    this.constants.notificationPeriod =
      this.apiClient.consts.nameService?.notificationPeriod?.toHuman();
    console.log(this.constants);
  }

  generateCommitHashBytes = (name: string, secret: number) => {
    const nameU8a: Uint8Array = stringToU8a(name);
    const secretU8a: Uint8Array = numberToU8a(secret);
    const saltedNameU8a: Uint8Array = new Uint8Array(
      nameU8a.length + secretU8a.length
    );
    console.log(secretU8a.forEach((b) => console.log(b.toString(16))));
    console.log(secret);
    console.log(secret.toString(16));
    saltedNameU8a.set(nameU8a);
    saltedNameU8a.set(secretU8a, nameU8a.length);
    console.log(saltedNameU8a);
    const hash = blake2AsHex(saltedNameU8a);
    return hash;
  };

  generateCommitmentHashCodec = (
    name: string = 'alice',
    secret: number = 3
  ) => {
    console.log(name, secret);
    const preimage = this.apiClient.createType('CommitmentRaw', [name, secret]);
    console.log('preimage');
    console.log(preimage.toHex());
    const hash = blake2AsHex(preimage.toU8a());
    console.log('commitment hash');
    console.log(hash);
    return hash;
  };

  async commit(account, commitmentHash) {
    try {
      let address = getAccountAddress(account);
      let commitTx = await this.apiClient.tx.nameService?.commit(
        address,
        commitmentHash
      );
      console.log('tx');
      console.log(address);
      return signAndSendTx(this.apiClient, commitTx, account);
    } catch (err) {
      alert(err);
    }
  }

  async revealAndRegister(account, name, secret, periods) {
    try {
      let revealTx = this.apiClient.tx.NameService?.reveal(
        name,
        secret,
        periods
      );
      return signAndSendTx(this.apiClient, revealTx, account);
    } catch (err) {
      alert(err);
    }
  }
}

export default NameServiceProvider;
