// import {
//   useContractKit,
//   useGetConnectedSigner,
//   useProvider,
// } from '@celo-tools/use-contractkit'
// import { useMemo } from 'react'
// import { Contract } from '@ethersproject/contracts'
// import SwayDropDeployment from '@sway/contracts/deployments/alfajores/SwayDrop.json'
// import { SwayDrop } from '@sway/contracts/typechain'
// import api from '../utils/api'

// function useIsEligibleForDrop(eventId: string): boolean {
//   const { address: account, network } = useContractKit()
//   const library = useProvider()
//   //   const chainId = network.chainId

//   return useMemo(() => {
//     if (!account) return false
//     const participants = await api.getEventMerkleDetails(eventId)
//     if(participants.)

//     const swayDrop = new Contract(
//       account,
//       SwayDropDeployment.abi,
//       library,
//     ) as SwayDrop

    

//     return true
//   }, [account, network, eventId])
// }


export default 1
