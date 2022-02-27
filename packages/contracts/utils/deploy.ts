import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function saveProxy(
  hre: HardhatRuntimeEnvironment,
  name: string,
  address: string,
) {
  const { artifacts } = hre

  const ERC1967_FULLY_QUALIFIED_NAME =
    '@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol:ERC1967Proxy'
  const proxyBuildInfo = await artifacts.getBuildInfo(
    ERC1967_FULLY_QUALIFIED_NAME,
  )
  const proxyArtifact = await artifacts.readArtifact(
    ERC1967_FULLY_QUALIFIED_NAME,
  )

  if (proxyBuildInfo) {
    const metadata = (proxyBuildInfo as any).output.contracts[
      '@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol'
    ]['ERC1967Proxy'].metadata
    if (!metadata) {
      throw new Error('Proxy metadata missing')
    }

    await hre.deployments.save(`${name}_Proxy`, {
      address,
      abi: proxyArtifact.abi,
      bytecode: proxyArtifact.bytecode,
      deployedBytecode: proxyArtifact.deployedBytecode,
      metadata,
    })
  } else {
    throw new Error('Proxy build info missing')
  }
}

export function sleep(ms: number, msg?: string) {
  if (msg) console.log(msg)
  return new Promise((resolve) => setTimeout(resolve, ms))
}
