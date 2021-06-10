import React from 'react';
import { Form, Formik } from 'formik';
import { Center, Box, Button } from '@chakra-ui/react';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Center>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              username: values.username,
              password: values.password,
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='username'
                placeholder='username'
                label='username'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='password'
                  label='password'
                  type='password'
                />
              </Box>
              <Button
                colorScheme='teal'
                type='submit'
                mt={4}
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Center>
  );
};

export default Register;
