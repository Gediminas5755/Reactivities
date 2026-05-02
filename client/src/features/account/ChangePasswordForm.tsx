import { Password } from "@mui/icons-material";
import { changePasswordSchema, type ChangePasswordSchema } from "../../lib/schemas/changePasswordSchema"
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccount";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
    const { changePassword } = useAccount();
    const onSubmit = async (data: ChangePasswordSchema) => {
        try {
            await changePassword.mutateAsync(data,{
                onSuccess: () => toast.success('password changed')
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <AccountFormWrapper <ChangePasswordSchema>
            title="Change Password"
            icon={<Password fontSize="large" />}
            onSubmit={onSubmit}
            submitButtonText="Change Password"
            resolver={zodResolver(changePasswordSchema)}
            reset={true}
        >
            <TextInput name="currentPassword" label="Current Password" type="password" />
            <TextInput name="newPassword" label="New Password" type="password" />
            <TextInput name="confirmPassword" label="Confirm New Password" type="password" />
        </AccountFormWrapper>
    )
}