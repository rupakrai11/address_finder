"use client";
// import from reactstrap
import { Col, Row, Form } from "reactstrap";
// import from common coponent
import { TextInput, CustomButton } from "../lib";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressInfo } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../../../assets/spinner.svg";
import axiosClient from "../../../../utills";
import PostalMessageContainer from "../messagecomponent";
import StateErrorMessageContainer from "../messagecomponent/stateError";
import SuccessMessageContainer from "../messagecomponent/success";
import "./styles.scss";

interface InfoType {
  postal: number;
  suburb: string;
  state: string;
}
interface length {
  length: number;
}

interface UseInfoType {
  message: string;
  messagetype: string;
}

const AddressForm = () => {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [postCode, setpostCode] = useState<number>(0);
  const [addressinfo, setAddressinfo] = useState<InfoType[]>([]);
  const [postalErrorrMessage, setPostalErrorrMessage] = useState<UseInfoType>({
    message: "",
    messagetype: "",
  });
  const [stateErrorrMessage, setStateErrorrMessage] = useState<UseInfoType>({
    message: "",
    messagetype: "",
  });
  const [successMessage, setSuccessMessage] = useState<UseInfoType>({
    message: "",
    messagetype: "",
  });


  // validataion schema
  const AddressFormSchema = Yup.object().shape({
    postcode: Yup.number().required("Postcode is requried"),
    state: Yup.string().required("State is requried"),
    suburb: Yup.string().required("Please select a gender"),
    // contactNumber: Yup.string().max("Message is requried")
  });
// api request
  useEffect(() => {
    // @ts-ignore
    if (postCode !== 0 && postCode.length > 3) {
      axiosClient
        .get(`/api/postcode/search.json?q=${postCode}`)
        .then(function (response) {
          // @ts-ignore
          if (response && response.data.localities) {
            const resData: InfoType[] = response.data?.localities?.locality.map(
              (item: any) => {
                return {
                  postal: item.postcode,
                  suburb: item.location,
                  state: item.state,
                };
              }
            );
            setAddressinfo(resData);
          }

          // handle success
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [postCode]);

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

  // user form submit
  const handleAddressSubmit = async (data: AddressInfo) => {
    // setLoading(true);
    // match suburb with postal
    const suburbMatchWithPostal = addressinfo.find(
      (item) =>
        item.postal === data.postcode &&
        item.suburb.toLowerCase() === data.suburb.toLowerCase()
    );
    if (!suburbMatchWithPostal) {
      setPostalErrorrMessage({
        message: `The postal code ${data.postcode} does not matches the suburb ${data.suburb}.`,
        messagetype: "error",
      });
    }
    // match satate with surburb
    const stateMatchesWithSuburb = addressinfo.find(
      (item) =>
        item.suburb.toLowerCase() === data.suburb.toLowerCase() &&
        item.state.toLowerCase() === data.state.toLowerCase()
    );
    if (!stateMatchesWithSuburb)
      setStateErrorrMessage({
        message: `The suburb ${data.suburb} does not exist in the state ${data.state}.`,
        messagetype: "error",
      });
      // is success
    const isSuccess = addressinfo.find(
      (item) =>
        item.postal === data.postcode &&
        item.suburb.toLowerCase() === data.suburb.toLowerCase() &&
        item.state.toLowerCase() === data.state.toLowerCase()
    );
    if (isSuccess) {
      setSuccessMessage({
        message: `The postcode ${data.postcode}, suburb ${data.suburb} and state ${data.state} entered are valid.`,
        messagetype: "success",
      });
    }
  };

  const handleWatch = () => {
    if (watch("postcode") && watch("state") && watch("suburb")) {
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="mt-5">
        <Row className="align-items-center justify-content-center d-flex">
          <Col md={6} className="form">
            {postalErrorrMessage.message && (
              <PostalMessageContainer userInfoMessage={postalErrorrMessage} />
            )}
            {stateErrorrMessage.message && (
              <StateErrorMessageContainer
                userInfoMessage={stateErrorrMessage}
              />
            )}
            {successMessage && (
              <SuccessMessageContainer userInfoMessage={successMessage} />
            )}

            <Form
              onSubmit={handleSubmit(handleAddressSubmit)}
              className="py-5 px-4"
            >
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
                      setValue={setpostCode}
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
                    error={errors?.state?.message}
                    invalid={errors.state && true}
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
              <CustomButton
                classname={`${
                  !handleWatch() ? "btn-primary" : "disabled"
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
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddressForm;
