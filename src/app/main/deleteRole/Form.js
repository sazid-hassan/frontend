import React from "react";
import { useForm } from "react-hook-form";

export function Form({ defaultValues, children, onSubmit }) {
    const { handleSubmit, register } = useForm({ defaultValues });

    // return (
    //     <form onSubmit={handleSubmit(onSubmit)}>

    //     </form>
    // );
}

export function Input({ register, name, ...rest }) {
    return <input placeholder="Role ID" {...register(name)} {...rest} />;
}
