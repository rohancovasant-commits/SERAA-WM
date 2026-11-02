import wealthspectrum from './wealthspectrum.svg'
import intellect from './intellect.svg'
import salesforce from './salesforce.svg'
import tifin from './tifin.svg'
import accenture from './accenture.svg'

/**
 * Logo files are the providers' own published assets (see README for sources). They are
 * displayed unaltered. `onDark` marks logos whose artwork is white or cream, which need a dark well.
 */
export const logos = {
  wealthspectrum: { src: wealthspectrum, onDark: true, height: 'h-6' },
  intellect: { src: intellect, onDark: false, height: 'h-9' },
  salesforce: { src: salesforce, onDark: true, height: 'h-[3.25rem]' },
  tifin: { src: tifin, onDark: true, height: 'h-7' },
  accenture: { src: accenture, onDark: false, height: 'h-8' },
} as const
