import * as Yup from "yup";
import ChangePassword from "../ChangePassword";
import DeleteAccount from "../DeleteAccount";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { IoIosKeypad } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../hooks/useAuth";

const AccountSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, ({ min }) =>
      min === 1
        ? `Display name must be at least ${min} character`
        : `Display name must be at least ${min} characters`
    )
    .required("Display name is a required field "),
});

const Account = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const { user, setProfile } = useAuth();
  const toast = useToast();

  return (
    <Fragment>
      <Formik
        initialValues={{
          displayName: user?.displayName || "",
          email: user?.email || "",
        }}
        validationSchema={AccountSchema}
        onSubmit={async ({ displayName }) => {
          if (displayName === user?.displayName) {
            return;
          }

          setLoading(true);

          try {
            await setProfile!(displayName);

            toast({
              title: "Success",
              description: "Your account was updated successfully",
              status: "success",
              position: "top-right",
              duration: 3000,
              isClosable: true,
            });
          } catch (err) {
            toast({
              title: "Error",
              description: "An error occurred",
              status: "error",
              position: "top-right",
              duration: 3000,
              isClosable: true,
            });
          } finally {
            setLoading(false);
          }
        }}
      >
        {(props) => (
          <Form id="account">
            <FormControl
              mb={5}
              isInvalid={
                !!props.errors.displayName && props.touched.displayName
              }
            >
              <FormLabel fontSize="lg" fontWeight="bold">
                Display name
              </FormLabel>

              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" children={<FaUser />} />

                <Input
                  name="displayName"
                  focusBorderColor="pink.500"
                  value={props.values.displayName}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </InputGroup>

              <FormErrorMessage>{props.errors.displayName}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              isInvalid={!!props.errors.email && props.touched.email}
            >
              <FormLabel fontSize="lg" fontWeight="bold">
                Email address
              </FormLabel>

              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaEnvelope />}
                />

                <Input
                  name="email"
                  focusBorderColor="pink.500"
                  isDisabled
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </InputGroup>

              <FormErrorMessage>{props.errors.email}</FormErrorMessage>
            </FormControl>
          </Form>
        )}
      </Formik>

      <FormControl>
        <FormLabel fontSize="lg" fontWeight="bold">
          Password
        </FormLabel>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none" children={<IoIosKeypad />} />

          <Input
            focusBorderColor="pink.500"
            value={Array(user?.uid.length).fill("*").join("")}
            isDisabled
          />

          <InputRightElement
            children={
              <IconButton
                size="sm"
                aria-label="Change password"
                icon={<MdEdit />}
                _focus={{}}
                onClick={onOpen2}
              />
            }
          />
        </InputGroup>
      </FormControl>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ md: "center" }}
        gridGap={{ base: 4, md: 0 }}
        my={6}
        p={4}
        borderRadius="lg"
        bgColor="red.400"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Delete account
          </Text>

          <Text color="gray.300" textAlign="justify">
            By deleting your account, you will lose all your data.
          </Text>
        </Box>

        <Button _focus={{}} onClick={onOpen}>
          Delete account
        </Button>
      </Flex>

      <Flex justify="flex-end">
        <Button
          type="submit"
          form="account"
          colorScheme="blue"
          _focus={{}}
          isLoading={loading}
        >
          Save changes
        </Button>
      </Flex>

      <ChangePassword isOpen={isOpen} onClose={onClose} />
      <DeleteAccount isOpen={isOpen2} onClose={onClose2} />
    </Fragment>
  );
};

export default Account;
