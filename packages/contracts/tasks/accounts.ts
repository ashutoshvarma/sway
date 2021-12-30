import { HardhatRuntimeEnvironment, RunSuperFunction } from "hardhat/types"

export async function balances(taskArgs: any, hre: HardhatRuntimeEnvironment, runSuper: RunSuperFunction<any>) {
  const accounts = await hre.ethers.getSigners()
  const { governorAddr, deployerAddr, proxyAdminAddr } = await hre.getNamedAccounts()

  const getAccountName = (addr: string) => {
    let name = ""
    switch (addr) {
      case governorAddr:
        name = "governorAddr"
        break;
      case deployerAddr:
        name = "deployerAddr"
        break;
      case proxyAdminAddr:
        name = "proxyAdminAddr"
        break;
      default:
        break;
    }
    return name
  }

  for (const account of accounts) {
    console.log(`${await account.address}\t${await account.getBalance()} ${getAccountName(account.address)}`)
  }
}
