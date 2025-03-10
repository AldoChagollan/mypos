import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import InputControl from "@/components/Input";
import Button from "@/components/Button";
import { dataControls } from "./form_items";

interface UserFormProps {
  onSubmit: (data: Record<string, any>) => void;
  form: UseFormReturn<FieldValues>;
}

const UserFormComponent: React.FC<UserFormProps> = ({ onSubmit, form }) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dataControls.map((res) => {
          return (
            <InputControl
              key={res.id}
              item={res}
              errors={errors}
              register={register}
            />
          );
        })}
        <div className="flex justify-end items-center gap-3">
          <Button text="Guardar" variant="contained" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserFormComponent;
