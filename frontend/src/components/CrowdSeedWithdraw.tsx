/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'

/* Example usage
<CrowdSeedWithdraw
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call withdraw"
  typedClient={typedClient}
  amount={amount}
/>
*/
// type CrowdSeedWithdrawArgs = Dao['methods']['withdraw(uint64)void']['argsObj']

// type Props = {
//   buttonClass: string
//   buttonLoadingNode?: ReactNode
//   buttonNode: ReactNode
//   typedClient: CrowdSeedClient
//   amount: CrowdSeedWithdrawArgs['amount']
// }

const CrowdSeedWithdraw = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling withdraw`)
    await props.typedClient.withdraw(
      {
        amount: props.amount,
      },
      { sender },
    )
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default CrowdSeedWithdraw
