import { useEffect, useState } from "react";
import { getClaimHistory } from "../../helperfunctions/history";
import { Link } from "react-router-dom";

type HistoryItem = {
  name: string;
  points: number;
  claimedAt: string;
};

function ClaimHistory() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async (page: number) => {
    setLoading(true);
    try {
      const res = await getClaimHistory(page);
      console.log(res);
      setHistory(res.history);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Error fetching claim history:", err);
      setError("Failed to fetch claim history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (history && history.length === 0) return <div>No claim history.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-6 pb-10">
      <div className="flex items-center gap-5 mb-6 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Claim History
          </h1>
        </div>

        <Link to={"/"}>
          <p className="text-gray-400 font-semibold hover:underline">
            Navigate to Home
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {history?.map((entry, index) => (
          <div
            key={index}
            className="bg-[#1b1f23] text-white flex justify-between px-4 py-3 rounded-md shadow-sm border border-[#2a2f33]"
          >
            <div>
              <p className="font-medium text-lg">
                {entry.name[0].toUpperCase() + entry.name.slice(1)}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(entry.claimedAt).toLocaleString()}
              </p>
            </div>
            <div className="text-sm font-semibold">{entry.points} pts</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6 text-white">
        <button
          className="px-3 py-1 bg-[#292d31] rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-[#292d31] rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ClaimHistory;
