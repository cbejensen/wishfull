import React from 'react'
import {RadioBox} from 'components/RadioBox'
import {CheckAuth} from 'components/CheckAuth'
import {FriendList} from 'components/User'
import {Search} from 'components/Search'
import {Grid} from 'react-bootstrap'

class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.state={selected: 0}
    this.select = this.select.bind(this)
  }
  select(selected) {
    console.log(selected)
    this.setState({selected: selected})
  }
  render() {
    const styles = {
      container: {
        paddingTop: '20px'
      }
    }
    const content = this.state.selected
      ? <Search
        excludeFriends
        excludeWishes
        placeHolder='Search for friends' />
      : <FriendList />
    return (
      <Grid style={styles.container}>
        <RadioBox
          handleSelect={this.select}
          textLeft='My Friends'
          textRight='Find Friends' />
        <CheckAuth>
          {content}
        </CheckAuth>
      </Grid>
    )
  }
}

export default Friends
