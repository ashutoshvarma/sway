import { ReactElement, useEffect, useState} from 'react'
import styles from './Collections.module.css'
import Card from './Card'
import api from '../../utils/api';

import {
  Event as SwayEvent,
} from '@sway/events/src/events'
import { useContractKit } from '@celo-tools/use-contractkit'
import 'react-dropdown/style.css'
import Dropdown from 'react-dropdown'


const options = ['Event', 'Something else']
const defaultOption = options[0]

export interface Token {
    created: string;
    metadataUri: string;
    transactionHash?: string | undefined;
    metadata: SwayEvent;
}

function Collections(): ReactElement {
  const { connect, address } = useContractKit()
  const [tokens, setTokens] = useState<Token[] | null>(null)
  const [tokenLoading, setTokenLoading] = useState<Boolean>(false)
  useEffect(()=>{
    (async()=>{
      if(address){
        setTokenLoading(true)
        let data = await api.getUserTokenInfo(address);
        data? setTokens(data.tokens): setTokens([]);
        setTokenLoading(false) 
      }
      else 
      setTokens(null)

    })()
  },[address])



  const renderTokens = ()=>{
    if(!address)
    return(<div className={styles['ConnectDiv']}>
      <h3>You are not connected to any wallet right now.<br/>Please connect to a wallet to see your collections.</h3>
      <button onClick={connect}>Connect</button>
    </div>)

    else if(tokenLoading)
    return(
      <div className={styles['CollectionGrid']}>
      <Card loading/>
      <Card loading/>
      <Card loading/>
      </div>
    )
    else if(!tokenLoading && !tokens?.length)
    return(
      <div className={styles['ConnectDiv']}>
        <h3>No tokens available for this account</h3>
      </div>
    )
    else 
    return(
      <div className={styles['CollectionGrid']}>
        {tokens?.map((token)=><Card token={token}/>)}
      </div>
    )
  }

  return (
    <section className={styles['Collection']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <h3>Collection</h3>
          <div style={{ display: 'flex' }}>
            <Dropdown
              options={options}
              // onChange={this._onSelect}
              className={styles['DropdownRoot']}
              controlClassName={styles['Dropdown']}
              placeholderClassName={styles['DropdownPlaceholder']}
              menuClassName={styles['DropdownMenu']}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
        </div>
       {renderTokens()}
        
        {/* <div className={styles['CreateContainer']}>
          <button>Create Event</button>
        </div> */}
      </div>
    </section>
  )
}

export default Collections
