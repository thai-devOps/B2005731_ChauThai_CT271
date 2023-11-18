import React from 'react';
// Define props interface used
interface IUserProps {}
const User: React.FC<IUserProps> =(_props: IUserProps) => {
  return (
    <div>
      User
    </div>
  );
};
export default User;
