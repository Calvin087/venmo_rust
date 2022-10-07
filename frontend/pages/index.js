import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import NearLogin from "../components/NearLogin";
import Transactions from "../components/Transactions";
import {
  contractCallFunction,
  contractViewFunction,
  wallet
} from "../near/near-setup";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [contractData, setContractData] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchMemos = async () => {
      const contractData = await contractViewFunction({
        functionName: "get_memos",
        args: { user: wallet.getAccountId() }
      });

      setContractData(contractData);
    };

    if (wallet?.getAccountId()) {
      console.log(wallet.getAccountId());
      fetchMemos();
    }
  }, []);

  const postToBlockchain = async (data) => {
    await contractCallFunction({
      functionName: "add_memo",
      args: {
        memo_text: data.message,
        price: data.amount
      }
    });
    window.location.reload();
  };

  return (
    <div>
      <Transactions contractData={contractData} />
      <NearLogin />
      <Form postToBlockchain={postToBlockchain} />
    </div>
  );
}
