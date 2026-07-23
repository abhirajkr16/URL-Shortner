import { useState } from "react";

function useForm(initialValues) {

    const [form, setForm] = useState(initialValues);

    const [errors, setErrors] = useState({});

    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));

    }

    return {
        form,
        setForm,
        errors,
        setErrors,
        handleChange,
    };

}

export default useForm;