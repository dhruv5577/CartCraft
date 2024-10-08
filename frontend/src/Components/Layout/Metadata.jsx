import React from 'react'
import {Helmet} from 'react-helmet'

export default function Metadata({title}) {
  return (
    <Helmet>
      <title>{`${title}-CartCraft`}</title>
    </Helmet>
  )
}
