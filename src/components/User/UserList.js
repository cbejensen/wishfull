import React from 'react';
import UserBoxHeader from './UserBoxHeader';
import UserBoxBody from './UserBoxBody';
import { BoxList, ExpandingBox, BoxHeader, BoxBody } from 'components/BoxList';
import randomColor from 'randomcolor';

const UserList = props => {
  return (
    <BoxList>
      {props.users.map((user, index) => {
        const userId = user.uid;
        const color = randomColor({ luminosity: props.luminosity || 'dark' });
        const headerProps = {
          color,
          luminosity: props.luminosity,
          userId,
          uid: props.uid,
          name: `${user.firstName} ${user.lastName}`
        };
        const bodyProps = {
          userId,
          bio: user.bio,
          luminosity: props.luminosity
        };
        return (
          <ExpandingBox key={userId} color={color}>
            <BoxHeader>
              <UserBoxHeader {...headerProps} />
            </BoxHeader>
            <BoxBody>
              <UserBoxBody {...bodyProps} />
            </BoxBody>
          </ExpandingBox>
        );
      })}
    </BoxList>
  );
};

UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  uid: React.PropTypes.node,
  luminosity: React.PropTypes.string
};

export default UserList;
