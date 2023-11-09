import React from 'react'
import { Embed } from 'semantic-ui-react'

const Movietrailer = () => (
  <Embed
    aspectRatio='4:3'
    id='youtubeLink'
    placeholder='/images/4by3.jpg'
    source='youtube'
    allow="autoplay"
  />
)

export default Movietrailer