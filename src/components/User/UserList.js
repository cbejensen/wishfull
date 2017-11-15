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
        const color = randomColor({ luminosity: props.colorType || 'dark' });
        const headerProps = {
          userId,
          uid: props.uid,
          name: `${user.firstName} ${user.lastName}`
        };
        const bodyProps = {
          userId
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
  uid: React.PropTypes.node
};

export default UserList;
