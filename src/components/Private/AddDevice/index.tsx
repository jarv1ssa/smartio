import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
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
import { MdDevices } from "react-icons/md";
import { useState } from "react";
import { useDevice } from "../../../hooks/useDevice";

const DeviceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, ({ min }) =>
      min === 1
        ? `Name must be at least ${min} character`
        : `Name must be at least ${min} characters`
    )
    .required("Name is a required field"),
});

const AddDevice = (props: Omit<ModalProps, "children">) => {
  const [loading, setLoading] = useState(false);

  const { connect } = useDevice();
  const toast = useToast();

  return (
    <Modal isCentered {...props}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Connect your device</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={DeviceSchema}
            onSubmit={async ({ name }) => {
              setLoading(true);
              connect!(name);

              toast({
                title: "Success",
                description: "Device connected",
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
              });

              props.onClose();
            }}
          >
            {(props) => (
              <Form id="connect">
                <FormControl
                  isInvalid={!!props.errors.name && props.touched.name}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdDevices />}
                    />

                    <Input
                      name="name"
                      placeholder="Name"
                      focusBorderColor="pink.500"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </InputGroup>

                  <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            type="submit"
            form="connect"
            variant="smart"
            isFullWidth
            isLoading={loading}
          >
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDevice;
