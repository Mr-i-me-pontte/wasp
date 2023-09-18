import * as UserService from "../../../../services/UserService";
import * as MemberService from "../../../../services/MemberService";
import * as UserInviteService from "../../../../services/UserInviteServices";
import { handleCompleteSignup, handleErrorSignup } from "../helpers";

const args = {
  user: {
    userId: "b04867c1-f1ea-4c86-b1cd-5258e5387312"
  },
  userInvite: {
    guestId: "51f74d68-1140-48f1-823d-18f5a6039eef"
  },
  openModal: jest.fn()
};

jest.mock("../../../../services/UserService");
jest.mock("../../../../services/MemberService");
jest.mock("../../../../services/UserInviteServices");

describe("Register helpers functions", () => {
  it("must complete the registration flow", async () => {
    UserService.createUser = jest.fn();
    MemberService.updateMember = jest.fn();
    UserInviteService.updateUserInviteStatus = jest.fn();

    handleCompleteSignup({ ...args });

    expect(UserService.createUser).toBeCalledTimes(1);
    expect(MemberService.updateMember).toBeCalledTimes(1);
    expect(UserInviteService.updateUserInviteStatus).toBeCalledTimes(1);
  });

  it("should handle the error message", async () => {
    const callback = jest.fn();

    handleErrorSignup("UsernameExistsException", callback);

    expect(callback).toBeCalledTimes(1);
  });
});
