"use client";
import { Col, Row, Form } from "reactstrap";
import { TextInput, CustomButton } from "../lib";
import "./styles.scss";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressInfo } from "@/types";

const AddressForm = () => {
  // validataion schema
  const AddressFormSchema = Yup.object().shape({
    postcode: Yup.number().required("Postcode is requried"),
    state: Yup.string().required("State is requried"),
    suburb: Yup.string().required("Suburb is requried"),
    // contactNumber: Yup.string().max("Message is requried")
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressInfo>({
    resolver: yupResolver(AddressFormSchema),
  });

  const handleAddressSubmit = async (data: AddressInfo) => {};
  return (
    <div className="container">
      <div className="mt-5">
        <Form
          onSubmit={handleSubmit(handleAddressSubmit)}
          className="py-5 px-4"
        >
          <Row className="align-items-center justify-content-center d-flex">
            <Col md={6} className="form">
              <div>
                <label className="form-label">Postcode*</label>
                <Controller
                  name="postcode"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      id="postcode"
                      name="postcode"
                      placeholder="Enter your postcode "
                      error={errors?.postcode?.message}
                      invalid={errors.postcode && true}
                      field={field}
                    />
                  )}
                />
              </div>
              <label className="form-label">Suburb*</label>
              <Controller
                name="suburb"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="suburb"
                    name="suburb"
                    placeholder="Enter your suburb "
                    error={errors?.suburb?.message}
                    invalid={errors.suburb && true}
                    field={field}
                  />
                )}
              />
              <label className="form-label">State*</label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="state"
                    name="state"
                    placeholder="Enter your state "
                    error={errors?.state?.message}
                    invalid={errors.state && true}
                    field={field}
                  />
                )}
              />

              <CustomButton classname="btn-primary ">Submit</CustomButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddressForm;
