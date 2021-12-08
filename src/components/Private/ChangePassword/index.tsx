import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, ({ min }) =>
      min === 1
        ? `Password must be at least ${min} character`
        : `Password must be at least ${min} characters`
    )
    .required("Password is a required field"),
  password: Yup.string()
    .min(6, ({ min }) =>
      min === 1
        ? `Password must be at least ${min} character`
        : `Password must be at least ${min} characters`
    )
    .required("New password is a required field"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is a required field"),
});

const ChangePassword = (props: Omit<ModalProps, "children">) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setPassword } = useAuth();
  const toast = useToast();

  return (
    <Modal isCentered {...props}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Change password</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={async ({ oldPassword, password }, { resetForm }) => {
              setLoading(true);

              try {
                await setPassword!(oldPassword, password);

                toast({
                  title: "Success",
                  description: "Your password was changed successfully",
                  status: "success",
                  position: "top-right",
                  duration: 3000,
                  isClosable: true,
                });

                setLoading(false);
                props.onClose();
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Invalid user credentials",
                  status: "error",
                  position: "top-right",
                  duration: 3000,
                  isClosable: true,
                });

                setLoading(false);
                resetForm();
              }
            }}
          >
            {(props) => (
              <Form id="delete">
                <FormControl
                  mb={4}
                  isInvalid={
                    !!props.errors.oldPassword && props.touched.oldPassword
                  }
                >
                  <InputGroup>
                    <Input
                      type={show1 ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Password"
                      focusBorderColor="pink.500"
                      value={props.values.oldPassword}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <InputRightElement
                      cursor="pointer"
                      onClick={() => setShow1(!show1)}
                    >
                      {show1 ? <HiEye /> : <HiEyeOff />}
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>
                    {props.errors.oldPassword}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={!!props.errors.password && props.touched.password}
                >
                  <InputGroup>
                    <Input
                      type={show2 ? "text" : "password"}
                      name="password"
                      placeholder="New password"
                      focusBorderColor="pink.500"
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <InputRightElement
                      cursor="pointer"
                      onClick={() => setShow2(!show2)}
                    >
                      {show2 ? <HiEye /> : <HiEyeOff />}
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{props.errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={
                    !!props.errors.passwordConfirmation &&
                    props.touched.passwordConfirmation
                  }
                >
                  <InputGroup>
                    <Input
                      type={show3 ? "text" : "password"}
                      name="passwordConfirmation"
                      placeholder="Confirm new password"
                      focusBorderColor="pink.500"
                      value={props.values.passwordConfirmation}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <InputRightElement
                      cursor="pointer"
                      onClick={() => setShow3(!show3)}
                    >
                      {show3 ? <HiEye /> : <HiEyeOff />}
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>
                    {props.errors.passwordConfirmation}
                  </FormErrorMessage>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            type="submit"
            form="delete"
            variant="smart"
            isFullWidth
            isLoading={loading}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePassword;
