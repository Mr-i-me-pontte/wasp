import { createUser } from "../../../services/UserService";
import { updateUserInviteStatus } from "../../../services/UserInviteServices";
import { updateMember } from "../../../services/MemberService";

const handleCompleteSignup = ({ user, userInvite, openModal }) => {
  const guestId = userInvite.guestId;

  createUser({
    id: user?.userId,
    name: user.name,
    email: user.email,
    welcome: true
  });

  updateMember(guestId, { ...user, welcome: true });
  updateUserInviteStatus(userInvite, "registered");
  openModal(true);
};

const handleErrorSignup = (code, callback) => {
  if (code === "UsernameExistsException") {
    callback();
  }
};

const triggerUserInvite = (invite, cb, onError) => {
  if (invite.length === 0) return onError();
  cb(invite[0]);
};

export {
  handleCompleteSignup,
  handleErrorSignup,
  triggerUserInvite
};
