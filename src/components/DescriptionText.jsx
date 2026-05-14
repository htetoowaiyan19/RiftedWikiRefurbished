import React from 'react'
import { formatDescription } from '../js/utils'

// Usage in a React component
export const DescriptionText = ({ text, level, multipliers }) => (
  <p
    className="whitespace-pre-wrap"
    dangerouslySetInnerHTML={{ __html: formatDescription(text, level, multipliers) }}
  />
)