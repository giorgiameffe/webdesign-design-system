/*
  <Input kind="text" placeholder="Placeholder" label="Label" name="name" />
  <Input kind="select" label="Label" name="name" options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
        ]}
    />
*/

import React from "react";

type InputProps = {
    kind: "text" | "email" | "password";
    label: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

type SelectProps = {
    kind: "select";
    label: React.ReactNode;
    options: { label: React.ReactNode; value: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Input: React.FC<InputProps | SelectProps> = ({ label, id, ...props }) => {

    const defaultId = React.useId() || id;

    return (
        <>
            <label htmlFor={defaultId}>{label}</label>
            {props.kind === "select" ? (
                <select {...props} id={defaultId} />
            ) : (
                <input id={defaultId} type={props.kind} {...props} />
            )}
        </>
    )
}