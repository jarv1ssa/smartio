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

const LoginSchema = Yup.object().shape({
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

const Login = (props: Omit<ModalProps, "children">) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Modal isCentered {...props}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Log into your home</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async ({ email, password }, { resetForm }) => {
              setLoading(true);

              try {
                await login!(email, password);
                navigate("/dashboard");
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
              <Form id="login">
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
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
