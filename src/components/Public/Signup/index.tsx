import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
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
import { FaEnvelope } from "react-icons/fa";
import { Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoIosKeypad } from "react-icons/io";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";

type SignupProps = {
  email: string;
  modalProps: Omit<ModalProps, "children">;
};

const SignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, ({ min }) =>
      min === 1
        ? `Display name must be at least ${min} character`
        : `Display name must be at least ${min} characters`
    )
    .required("Display name is a required field "),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is a required field"),
  password: Yup.string()
    .min(6, ({ min }) =>
      min === 1
        ? `Password must be at least ${min} character`
        : `Password must be at least ${min} characters`
    )
    .required("Password is a required field"),
});

const Signup = ({ email, modalProps }: SignupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Transaction succeeded!</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              displayName: "",
              email,
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (
              { displayName, email, password },
              { resetForm }
            ) => {
              try {
                setLoading(true);
                await signup!(displayName, email, password);
                navigate("/dashboard");
              } catch (err) {
                toast({
                  title: "Error",
                  description: "An error occurred",
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
              <Form id="login">
                <FormControl
                  mb={4}
                  isInvalid={
                    !!props.errors.displayName && props.touched.displayName
                  }
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaEnvelope />}
                    />

                    <Input
                      name="displayName"
                      placeholder="Display name"
                      focusBorderColor="pink.500"
                      value={props.values.displayName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {props.errors.displayName}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={!!props.errors.email && props.touched.email}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaEnvelope />}
                    />

                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      focusBorderColor="pink.500"
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </InputGroup>

                  <FormErrorMessage>{props.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!props.errors.password && props.touched.password}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<IoIosKeypad />}
                    />

                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      focusBorderColor="pink.500"
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <InputRightElement
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEye /> : <HiEyeOff />}
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{props.errors.password}</FormErrorMessage>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            type="submit"
            form="login"
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

export default Signup;
