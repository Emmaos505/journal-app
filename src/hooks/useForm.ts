import { useMemo, useState } from 'react';

export const useForm = <T, K>(initialForm: T, formValidations?: Record<string, [(value: string) => boolean, string]>, formErrorData?: K) => {

    const [formState, setFormState] = useState<T>(initialForm);
    const [formErrors, setFormErrors] = useState<K | T>(formErrorData || initialForm);

    const isFormValid = useMemo(() => {
        const errors = Object.values(formErrors as object);
        console.log('errors', errors)
        const hasErrors = errors.filter(value => value !== '');
        console.log('hasErrors', hasErrors)
        return !hasErrors.length;
    }, [formErrors]);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = target;
        if (formValidations) {
            const [validation, errorMessage] = formValidations[name];
            if (validation(value)) setFormErrors({ ...formErrors, [name]: '' })
            else setFormErrors({ ...formErrors, [name]: errorMessage });
        }
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
        setFormErrors(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        formErrors,
        isFormValid
    }
}