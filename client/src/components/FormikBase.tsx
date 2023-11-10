import * as Yup from 'yup';
import {Formik, FormikValues, FormikHelpers, FormikProps, FormikConfig,} from 'formik';

export type DefaultOnSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;

interface Props extends FormikConfig<FormikValues> {
    initialValues: FormikValues
    onSubmit: DefaultOnSubmit
    children: (props: FormikProps<FormikValues>) => JSX.Element
    validationSchema?: Yup.ObjectSchema<FormikValues, Yup.AnyObject, FormikValues, ''>
}

export default function FormikBase({initialValues, validationSchema, onSubmit, children, ...props}: Props) {
	return (
		<Formik
			initialValues={ initialValues }
			validationSchema={ validationSchema }
			enableReinitialize
			validateOnChange={ false }
			validateOnBlur={ false }
			onSubmit={ onSubmit }
			{ ...props }>
			{props => children({...props,})}
		</Formik>
	);
}
