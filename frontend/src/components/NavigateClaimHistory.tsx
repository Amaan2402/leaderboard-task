import { Link } from "react-router-dom";

function NavigateClaimHistory() {
  return (
    <div className="mb-3">
      <Link to={"/claim-history"}>
        <p className="text-gray-400 text-sm font-semibold hover:underline">
          Navigate to Claim history
        </p>
      </Link>
    </div>
  );
}

export default NavigateClaimHistory;
