import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormProps<T> {
    initialValues: T;
    onSubmit: (values: T) => Promise<void>;
}

export const useForm = <T extends Record<string, any>>({ initialValues, onSubmit }: UseFormProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCustomChange = (name: string, value: any) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSubmit(values);
        } catch (err) {
            setError('Ocurrió un error al procesar el formulario');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => setValues(initialValues);

    return {
        values,
        loading,
        error,
        handleChange,
        handleCustomChange,
        handleSubmit,
        reset
    };
};
