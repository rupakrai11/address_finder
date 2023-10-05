"use client";
import { Col, Row, Form } from "reactstrap";
import { TextInput, CustomButton, SelectInput } from "../lib";
import "./styles.scss";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressInfo } from "@/types";
// import axiosClient from "../../../../utills";
import { Console } from "console";
import { useState } from "react";
import Image from "next/image";
import Spinner from "../../../assets/spinner.svg";
import axiosClient from "../../../../utills";

const AddressForm = () => {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  // validataion schema
  const AddressFormSchema = Yup.object().shape({
    postcode: Yup.number().required("Postcode is requried"),
    state: Yup.string().required("State is requried"),
    suburb:Yup.object({
      value: Yup.string().required("Please select a gender"),
    }),
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
    // @ts-ignore
    resolver: yupResolver(AddressFormSchema),
  });

  const handleAddressSubmit = async (data: AddressInfo) => {
    // const resp = await appService.getPostalDetails("2500");
    console.log("data", data);
    setLoading(true);
    // }
    const res = axiosClient
      .get(
        `/api/postcode/search.json?q=${data.postcode}&&${data.state}&&${data.suburb}`
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    console.log("res", res);
  };
  const getLogincredentials = () => {
    if (watch("postcode") && watch("state") && watch("suburb")) {
      return false;
    }
    return true;
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

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
                  <SelectInput
                    name="state"
                    options={options}
                    field={field}
                    error={errors?.suburb?.message}
                    invalid={errors.suburb && true}
                    control={control}
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
              <CustomButton
                classname={`${
                  !getLogincredentials() ? "btn-primary" : "disabled"
                }`}
                disabled={loading}
                // onClick={onReset}
              >
                {loading ? (
                  <Image src={Spinner} className="loading" alt="spinner" />
                ) : (
                  "Submit"
                )}
              </CustomButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddressForm;
