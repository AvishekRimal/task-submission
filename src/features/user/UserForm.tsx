import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useUserStore } from './store/useUserStore';
import { Field, Form, Formik, type FieldProps } from 'formik';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { userSchema, type UserFormValues } from './schema/user.schema';

export const UserForm = ({ onSubmit, isSubmitting }: { onSubmit: any, isSubmitting: boolean }) => {
  const { selectedUser, closeModal } = useUserStore();

   const initialValues: UserFormValues = {
    firstName: selectedUser?.firstName || '',
    lastName: selectedUser?.lastName || '',
    email: selectedUser?.email || '',
    age: selectedUser?.age || undefined, 
    address: selectedUser?.address?.address || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(userSchema)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-5 p-6 bg-white">
          <Field name="firstName">
            {({ field }: FieldProps) => (
              <Input label="First Name *" {...field} error={touched.firstName ? (errors.firstName as string) : ''} placeholder="Enter your first name" />
            )}
          </Field>

          <Field name="lastName">
            {({ field }: FieldProps) => (
              <Input label="Last Name *" {...field} error={touched.lastName ? errors.lastName : ''} placeholder="Enter your last name" />
            )}
          </Field>

          <Field name="email">
            {({ field }: FieldProps) => (
              <Input label="Email Address *" type="email" {...field} error={touched.email ? errors.email : ''} placeholder="Enter your email address" />
            )}
          </Field>

          <Field name="age">
            {({ field }: FieldProps) => (
              <Input label="Age" type="number" {...field} error={touched.age ? errors.age : ''} />
            )}
          </Field>

          <div className="flex gap-3 justify-end pt-4 mt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>{selectedUser ? 'Update' : 'Create'} User</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};