import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
import NearLogin from "../components/NearLogin";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <NearLogin />
      <Form />
    </div>
  );
}
