import React, { ReactElement } from 'react'
import { Formik, Form as FormikForm } from 'formik'
import styles from './Form.module.css'
import ToggleInput from './ToggleInput'
import ImageInput from './ImageInput'
import SelectInput from './SelectInput'
import {
  CategorySelect1,
  CategorySelect2,
  CategoryOptions1,
  CategoryOptions2,
} from './CategorySelect'
import Field from './Field'

import nftIcon1 from '../../assets/icons/nft-op-1.svg'
import nftIcon2 from '../../assets/icons/nft-op-2.svg'
import nftIcon3 from '../../assets/icons/nft-op-3.svg'
import nftIcon4 from '../../assets/icons/nft-op-4.svg'
import nftIcon5 from '../../assets/icons/nft-op-5.svg'

interface FormValuesInterface {
  image: FileList | null | undefined
}

const initialValues: FormValuesInterface = {
  image: null,
}

const CAT_OPTIONS1: CategoryOptions1[] = [
  { value: 'nfts', label: "NFT's", imageUrl: nftIcon1 },
  { value: 'nfts arts', label: "NFT's Arts", imageUrl: nftIcon2 },
  { value: 'nfts exhibition', label: "NFT's Exhibition", imageUrl: nftIcon3 },
  { value: 'nfts launch', label: "NFT's Launch", imageUrl: nftIcon4 },
  { value: 'nfts promotions', label: "NFT's Promotion", imageUrl: nftIcon5 },
]

const CAT_OPTIONS2: CategoryOptions2[] = [
  { value: 'nfts', label: "NFT's" },
  { value: 'nfts arts', label: "NFT's Arts" },
  { value: 'nfts exhibition', label: "NFT's Exhibition" },
  { value: 'nfts launch', label: "NFT's Launch" },
  { value: 'nfts promotions', label: "NFT's Promotion" },
]
function Form(): ReactElement {
  return (
    <section style={{ overflowX: 'hidden' }}>
      <div className="wrapper narrow">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <FormikForm className={styles.Form}>
            <div className={styles.FormSection}>
              <h3 className={styles.SectionTitle}>
                1. What is the category of your event?
              </h3>
              <CategorySelect1 name="Category1" options={CAT_OPTIONS1} />
              <h3 className={styles.SectionTitle}>Select Category</h3>
              <CategorySelect2 name="Category2" options={CAT_OPTIONS2} />
            </div>
            <div className={styles.FormSection}>
              <h3 className={styles.SectionTitle}>
                2. Is this a private or Public Event?
              </h3>

              <ToggleInput
                choices={['Private', 'Public']}
                name="public"
                id="public"
              />
            </div>
            <div className={styles.FormSection}>
              <h3 className={styles.SectionTitle}>
                3. When will this Event be?
              </h3>
              <div className={styles.Section3InputGrid}>
                <Field
                  input={SelectInput}
                  options={['Monthly', 'Weekly', 'Yearly', 'Once']}
                  placeholder="Select Frequency"
                  name="interval"
                  id="interval"
                />
                <Field
                  input={SelectInput}
                  options={['First Day', 'Last Day']}
                  placeholder="Select on Day"
                  name="onDay"
                  id="onDay"
                />
                <Field label="Starts" name="startDate" type="date" />

                <Field name="endDate" type="date" label="Ends" />
              </div>
            </div>
            <div className={styles.FormSection}>
              <h3 className={styles.SectionTitle} id={styles.Section4Title}>
                4. Event Details {'&'} Description
              </h3>
              <div className={styles.Section4InputGrid}>
                <Field name="eventName" label="Event Title" />

                <Field
                  input={SelectInput}
                  name="eventCategory"
                  label="Event Category"
                  options={['test1', 'test2', 'test3']}
                />
                <ImageInput
                  className={styles.TwoRow}
                  name="image"
                  label="Add an event image:"
                />

                <Field
                  className={styles.TwoRow}
                  name="link"
                  label="Paste your link here"
                />

                <Field name="email" label="Your Email Address" />

                <Field name="discord" label="Discord Account" />

                <Field
                  as="textarea"
                  className={styles.TwoRow}
                  name="description"
                  label="Event Description"
                />
              </div>
            </div>
            <div className={styles.CreateContainer}>
              <button>Create Event</button>
            </div>
          </FormikForm>
        </Formik>
      </div>
    </section>
  )
}

export default Form
