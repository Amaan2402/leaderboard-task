import { useState } from "react";
import { addUser } from "../helperfunctions/user";
import toast from "react-hot-toast";

function AddUser() {
  const [name, setName] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleAddUser = async () => {
    if (!name.trim()) {
      toast.error("Please enter a valid name");
      return;
    }

    setButtonDisabled(true);

    toast.promise(addUser(name), {
      loading: "Adding user...",
      success: (response) => {
        console.log(response);
        return "User added successfully!";
      },
      error: (error) => {
        return error.response?.data?.message || "Failed to add user";
      },
    });

    setButtonDisabled(false);
    setName("");
  };
  return (
    <div className="mb-2">
      <input
        type="text"
        className="outline-none border border-[#373737] bg-[#161a1e] rounded-md px-1 sm:px-2 py-1 mr-2"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="bg-[#1e1e2f] text-white rounded-md px-2 py-1 font-semibold hover:bg-[#6d5baf] cursor-pointer"
        onClick={handleAddUser}
        disabled={isButtonDisabled}
      >
        Add User
      </button>
    </div>
  );
}

export default AddUser;
