import { useEffect, useState } from "react";
import UserListCard from "./UserListCard";
import { getUsers } from "../../helperfunctions/user";
import Header from "./Header";
import AddUser from "../AddUser";
import NavigateClaimHistory from "../NavigateClaimHistory";

type User = { name: string; totalPoints: number; _id: string };

function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleUpdateUserState = (userId: string, totalPoints: number) => {
    setUsers((prevUsers) => {
      if (!prevUsers) return null;
      return prevUsers.map((user) =>
        user._id === userId ? { ...user, totalPoints } : user
      );
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (isLoading) return <div className="w-6/12">Loading...</div>;
  if (error) return <div className="w-6/12">Error: {error}</div>;
  if (users && users.length === 0)
    return <div className="w-6/12">No users found</div>;

  return (
    <div className="lg:w-6/12">
      <NavigateClaimHistory />
      <AddUser />
      <Header />
      {users?.map((user) => (
        <UserListCard
          key={user._id}
          user={user}
          handleUpdateUserState={handleUpdateUserState}
        />
      ))}

      {/* Pagination Controls */}
      <div className="flex gap-2 mt-4 justify-center items-center text-sm">
        <button
          className="px-3 py-1 bg-[#222] text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-[#222] text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
