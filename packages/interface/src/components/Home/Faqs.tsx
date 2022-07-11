import { ReactElement } from 'react'
// import Accordion from "react-bootstrap/Accordion";
import styles from './Faqs.module.css'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import 'react-accessible-accordion/dist/fancy-example.css'

function Faqs(): ReactElement {
  return (
    <div className={styles['Faq']}>
      <Accordion
        allowZeroExpanded
        className={styles['Accordion']}
        // bsPrefix={styles.Accordion}
        // defaultActiveKey="0"
      >
        <div className={styles['Col']}>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                What is NFT ?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
              A non-fungible token (NFT) is a non-interchangeable unit of data
              stored on a blockchain.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                How can I create an event ?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                You need to connect with the team on social channels 
                like Twitter and Discord and give us details about 
                your event with a NFT avatar and list of addresses who
                attended the event. We will take care of the
                rest.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
               How can I claim my NFT ?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Go to the event page and click on CLAIM button to
                claim your free NFT 
                
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
        <div className={styles['Col']}>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Why am I not able to claim my NFT ?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                NFTs can only be claimed by people who attended the event.
                If you have attended the event and still you are not able 
                claim then connect with event creators and verify if your
                wallet address is eligible.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Where can I see my claimed NFT ?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                All your NFTs can be found on MY COLLECTION PAGE,
                you can also verify them on celo block explorer.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  )
}

export default Faqs
