import { Box, Button, Flex, flexbox, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link color='white' mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href='register'>
          <Link color='white'>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box p={4}>{data.me.username}</Box>
        <Button variant='link'>Logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg='lightblue' p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
