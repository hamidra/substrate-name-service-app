import { signAndSendTx } from './txHandler';
import { getAccountAddress } from './utils';

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

  async commit(account, commitmentHash) {
    try {
      let address = getAccountAddress(account);
      let commitTx = this.apiClient.tx.NameService?.commit(
        address,
        commitmentHash
      );
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
