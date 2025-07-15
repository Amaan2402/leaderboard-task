import LeaderBoard from "./leaderboard/LeaderBoard";
import UserList from "./userlist/UserList";

function Home() {
  return (
    <div className="px-5 sm:px-14 md:px-32 lg:px-44 py-14 flex flex-col lg:flex-row gap-10">
      <UserList />
      <LeaderBoard />
    </div>
  );
}

export default Home;
