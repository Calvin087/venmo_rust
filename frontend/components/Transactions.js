import { useEffect, useState } from "react";
import { contractViewFunction, wallet } from "../near/near-setup";

const Transactions = ({ contractData }) => {
  return (
    <>
      {contractData && (
        <>
          {contractData.map((memo, i) => {
            const [memoText, amount] = memo.split(" || ");
            const [num, _] = amount.split("NEAR");
            console.log();
            return (
              <div key={i}>
                <div>
                  {memoText} {num} NEAR
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Transactions;
