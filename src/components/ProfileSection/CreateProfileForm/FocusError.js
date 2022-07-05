import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

const FocusError = () => {
    const { errors, isSubmitting, isValidating } = useFormikContext();

    useEffect(() => {
        if (isSubmitting && !isValidating) {
            let keys = Object.keys(errors);        
            console.log(keys, "keys...................")

            if (keys.length > 0) {
                const selector = `[id=${keys[0]}]`;
                console.log(selector, "selector..................")
                const errorElement = document.querySelector(selector);
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    errorElement.focus({ preventScroll: true });
                }
            }
        }
    }, [errors, isSubmitting, isValidating]);

    return null;
};

export default FocusError;