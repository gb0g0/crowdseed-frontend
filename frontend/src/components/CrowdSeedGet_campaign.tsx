/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as algokit from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

/* Example usage
<CrowdSeedGet_campaign
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call get_campaign"
  typedClient={typedClient}
  new_camp={new_camp}
/>
*/
// type CrowdSeedGet_campaignArgs =
//   CrowdSeed['methods']['get_campaign(string)(string,string,string,uint64,uint64,uint64,address,bool)']['argsObj']

// type Props = {
//   buttonClass: string
//   buttonLoadingNode?: ReactNode
//   buttonNode: ReactNode
//   typedClient: CrowdSeedClient
//   new_camp: CrowdSeedGet_campaignArgs['new_camp']
// }

const CrowdSeedGet_campaign = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling get_campaign`)
    // await props.typedClient.getCampaign(
    //   {
    //     new_camp: props.new_camp,
    //   },
    //   { sender },
    // )
    const index = 478514511
    const boxName = Buffer.from('camp1')
    const boxResponse = await algodClient.getApplicationBoxByName(index, boxName).do()
    const boxValue = boxResponse.value
    console.log(boxValue)
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default CrowdSeedGet_campaign
