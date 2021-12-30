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
                Accordion Item #1
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Accordion Item #1
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Accordion Item #1
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
        <div className={styles['Col']}>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Accordion Item #1
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['AccordionItem']}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles['AccordionItemButton']}>
                Accordion Item #1
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles['AccordionPanel']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  )
}

export default Faqs
