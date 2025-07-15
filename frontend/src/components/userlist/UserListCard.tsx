import toast from "react-hot-toast";
import { claimPoints } from "../../helperfunctions/user";

function UserListCard({
  user,
  handleUpdateUserState,
}: {
  user: { name: string; totalPoints: number; _id: string };
  handleUpdateUserState: (userId: string, totalPoints: number) => void;
}) {
  const handleClaimPoints = async () => {
    toast.promise(claimPoints(user._id), {
      loading: `Claiming points for user ${user.name}...`,
      success: (response) => {
        console.log(response);
        handleUpdateUserState(user._id, response.user.totalPoints);
        return `Successfully claimed ${response.pointsClaimed} points for user ${user.name}!`;
      },
      error: (error) => {
        return error.response?.data?.message || "Failed to claim points";
      },
    });
  };
  return (
    <div className="bg-[#161a1e] border-[1px] border-slate-800 px-3 py-2 mb-2 flex justify-between items-center rounded-lg">
      <h1 className="font-semibold w-6/12">
        {user.name[0].toUpperCase() + user.name.slice(1)}
      </h1>
      <p className="w-4/12">{user.totalPoints}</p>
      <button
        className="bg-[#191d20] border-[1px] border-[#222629] font-light px-3 py-[2px] rounded-md hover:bg-[#202427] cursor-pointer"
        onClick={handleClaimPoints}
      >
        Claim
      </button>
    </div>
  );
}

export default UserListCard;
