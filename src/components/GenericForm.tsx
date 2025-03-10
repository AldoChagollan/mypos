import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import InputControl from "@/components/Input";
import Button from "@/components/Button";
import { FormControl } from "./GenericControls";

interface UserFormProps {
  onSubmit: (data: Record<string, any>) => void;
  formHook: UseFormReturn<FieldValues>;
  dataControls: FormControl[];
  loading?: boolean;
  disabled?: boolean;
  onOkText?: string;
  onCancelText?: string;
  onCancel?: () => void;
}

const GenericFormComponent: React.FC<UserFormProps> = ({
  onSubmit,
  formHook,
  dataControls,
  loading = false,
  disabled = false,
  onOkText,
  onCancelText,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

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
              loading={loading}
            />
          );
        })}
        <div className="flex justify-end items-center gap-3">
          {typeof onCancel === "function" && (
            <Button
              text={onCancelText}
              variant="contained"
              type="submit"
              disabled={loading || disabled}
            />
          )}
          <Button
            text={onOkText}
            variant="contained"
            type="submit"
            disabled={loading || disabled}
            icon={loading ? "eos-icons:three-dots-loading" : ""}
          />
        </div>
      </form>
    </div>
  );
};

export default GenericFormComponent;
