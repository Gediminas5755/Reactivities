import { Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider, useForm, } from "react-hook-form";
import type { FieldValues, Resolver } from "react-hook-form";

type Props<TFormData extends FieldValues> = {
    title: string;
    icon: React.ReactNode;
    onSubmit: (data: TFormData) => Promise<void>;
    children: React.ReactNode;
    submitButtonText: string;
    resolver?: Resolver<TFormData>;
    reset?: boolean
}

export default function AccountFormWrapper<TFormData extends FieldValues>(
    { title, icon, onSubmit, children, submitButtonText, resolver, reset }: Props<TFormData>) {
    const methods = useForm<TFormData>({ resolver, mode: 'onTouched' });

    const formSubmit = async (data : TFormData) => {
        await onSubmit(data);
        if (reset) methods.reset();
    }
    return (
        <FormProvider {...methods}>
            <Paper
                component="form"
                onSubmit={methods.handleSubmit(formSubmit)}
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    maxWidth: 'md',
                    mx: 'auto',
                    borderRadius: 3
                }}>
                <Box display="flex" alignItems="center" justifyContent='center' color="secondary.main" gap={3}>
                    {icon}
                    <Typography variant="h4" >{title}</Typography>
                </Box>
                {children}
                <Button type="submit" variant="contained" size="large" color="primary" disabled={!methods.formState.isValid || methods.formState.isSubmitting}>
                    {submitButtonText}
                </Button>
            </Paper>
        </FormProvider>



    )
}