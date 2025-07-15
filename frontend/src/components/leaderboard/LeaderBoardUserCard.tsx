function LeaderBoardUserCard({
  user,
}: {
  user: {
    _id: string;
    name: string;
    rank: number;
    totalPoints: number;
  };
}) {
  function getBgColor(rank: number) {
    switch (rank) {
      case 1:
        return "bg-[#6d5baf]";

      case 2:
        return "bg-[#b87d44]";

      case 3:
        return "bg-[#40828f]";

      default:
        return "bg-[#161a1e]";
    }
  }

  const bgColor = getBgColor(user.rank);

  return (
    <div className="bg-[#161a1e] flex mb-3 p-3 justify-between rounded-md text-lg">
      <div className="flex items-center gap-10">
        <div>
          <p className={`text-lg ${bgColor} px-2 rounded-md`}>{user.rank}</p>
        </div>

        <div>
          <p>{user.name[0].toUpperCase() + user.name.slice(1)}</p>
        </div>
      </div>

      <div>{user.totalPoints} points</div>
    </div>
  );
}

export default LeaderBoardUserCard;
