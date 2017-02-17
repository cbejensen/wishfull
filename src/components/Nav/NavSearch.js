import React from 'react'
import {Search} from 'components/Search'
import {Row, Col} from 'react-bootstrap'
import './Nav.css'

export default function NavSearch(props) {
  return (
    <Row className="Nav-search">
      <Col xs={12}>
        <Search uid={props.uid} placeHolder='Search' />
      </Col>
    </Row>
  )
}

NavSearch.propTypes = {
  uid: React.PropTypes.node.isRequired
}
