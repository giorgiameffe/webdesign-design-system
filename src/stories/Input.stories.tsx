import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/Input/Input";

const meta: Meta = {
    title: "Components/Input",
    parameters: {
        layout: "centered",
    },
    args: {
        label: "Label",
    },
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Input kind="text" label="Label" placeholder="Placeholder" />
}