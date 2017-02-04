import React from 'react'
import { GalaxyPanel,
        SummaryPanel,
        SearchPanel } from 'components/Panels'
import ItemBox from 'components/ItemBox';
import { Grid } from 'react-bootstrap'

export default function Main(props) {
  return (
    <div>
      <GalaxyPanel title='WISHFULL' subtitle='A place to make and fulfill wishes' />
      <SummaryPanel />
      {/* <LoginPanel /> */}
      {/* <SearchPanel /> */}
      <div style={{height: '500px'}}></div>
    </div>
  )
}
