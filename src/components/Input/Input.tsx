/*
  <Input kind="text" placeholder="Placeholder" label="Label" name="name" />
*/

type InputProps = {
    kind: "text" | "email" | "password";
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = () => {
    return <input type="text" placeholder="Placeholder" name="name" />;
}