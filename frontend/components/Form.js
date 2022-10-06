import { useForm } from "react-hook-form";
import { callFunction, viewFunction } from "../near/near-setup";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const res = await callFunction({
      contractID: "venmo2.ctorra.testnet",
      functionName: "add_memo",
      args: {
        memo_text: "this is a test from backend",
        price: "2"
      }
    });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Recipient"
        {...register("recipient", { required: true, min: 1 })}
      />
      <input
        type="number"
        placeholder="Amount"
        {...register("amount", { required: true })}
      />
      <textarea {...register("message", { required: true })} />

      <input type="submit" />
    </form>
  );
};

export default Form;
