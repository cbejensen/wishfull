import React from 'react'
import { GalaxyPanel, SummaryPanel } from 'components/Panels'
import { Grid } from 'react-bootstrap'

export default function Main(props) {
  const styles = {
    main: {
      zIndex: '999'
    }
  }
  return (
    <div style={styles.main}>
      <GalaxyPanel text='WISHFULL' />
      <SummaryPanel />
      <div style={{height: '1000px'}}></div>
    </div>
  )
}
