import { useForm } from "react-hook-form";
import { contractCallFunction, contractViewFunction } from "../near/near-setup";

const Form = ({ postToBlockchain }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Sending data to the blockchain working.

  const onSubmit = async (data) => {
    postToBlockchain(data);
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
