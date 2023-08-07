/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const createResponseUser = (user: any) => {
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...responseUser } = user;

    return responseUser;
  } else return null;
};
