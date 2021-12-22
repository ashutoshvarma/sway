import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsUrl,
  IsString,
  IsBoolean,
} from 'class-validator'

export interface NFTMetadata extends Event {
  attributes: { trait_type: string; value: string }[]
}

export class Event {
  static attributes_props: Array<keyof Event> = [
    'start_date',
    'end_date',
    'virtual_event',
    'city',
    'country',
    'event_url',
  ]

  @IsString()
  description!: string

  @IsUrl()
  external_url!: string

  @IsUrl()
  image_url!: string

  @IsUrl()
  image!: string

  @IsString()
  name!: string

  @IsInt()
  @Min(1900)
  @Max(9999)
  year!: number

  @IsString({ each: true })
  tags!: string[]

  @IsDate()
  start_date!: Date

  @IsDate()
  end_date!: Date

  @IsBoolean()
  virtual_event!: boolean

  @IsString()
  city!: string

  @IsString()
  country!: string

  @IsUrl()
  event_url!: string

  metadata(): NFTMetadata {
    return {
      ...this,
      attributes: Event.attributes_props.map((p) => {
        return { trait_type: p.toString(), value: this[p].toString() }
      }),
    }
  }
}
