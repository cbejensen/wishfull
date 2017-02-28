import React from 'react'
import {AutoScrollContainer,
  TitlePanel,
  FeaturesPanel,
  SearchPanel} from 'components/Panels'
import {Search} from 'components/Search'
import ItemBox from 'components/ItemBox';
import { Grid } from 'react-bootstrap'

export default function Main(props) {
  return (
    <div style={{position: 'relative'}}>
      <AutoScrollContainer arrowColor='#ffffff'>
        <TitlePanel
          title='WISHFULL'
          subtitle='A place to make and fulfill wishes' />
      </AutoScrollContainer>
      <AutoScrollContainer >
        <FeaturesPanel />
      </AutoScrollContainer>
      <SearchPanel />
    </div>
  )
}
