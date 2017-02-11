import React from 'react'
import {AutoScrollContainer,
  GalaxyPanel,
  FeaturesPanel,
  SearchPanel} from 'components/Panels'
import {Search} from 'components/Search'
import ItemBox from 'components/ItemBox';
import { Grid } from 'react-bootstrap'

export default function Main(props) {
  // container div has position relative
  // so children can calc offsetTop
  return (
    <div style={{position: 'relative'}}>
      <AutoScrollContainer arrowColor='#ffffff'>
        <GalaxyPanel
          title='WISHFULL'
          subtitle='A place to make and fulfill wishes' />
      </AutoScrollContainer>
      <AutoScrollContainer>
        <FeaturesPanel />
      </AutoScrollContainer>
      <SearchPanel />
      <div style={{height: '1000px'}}></div>
    </div>
  )
}
