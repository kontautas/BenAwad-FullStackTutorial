import React from 'react';
import { Form, Formik } from 'formik';
import { Center, Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Center>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              username: values.username,
              password: values.password,
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data?.login.errors));
            } else if (response.data?.login.user) {
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Center>
  );
};

export default Login;
