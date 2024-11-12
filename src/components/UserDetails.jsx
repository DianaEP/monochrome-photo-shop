import classes from "./UserDetails.module.css";
import Modal from "../UI/Modal";
import { useContext, useEffect, useState } from "react";
import ModalContextActions from "../store/ModalContextActions";
import { AnimatePresence } from "framer-motion";
import { auth } from "../firebaseConfig";
import { getAdditionalUserData, updateAdditionalUserData } from "../util/http";
import { getAuth } from "firebase/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import ErrorBlock from "./ErrorBlock";
import Input from "../UI/Input";
import Button from "../UI/Button";
import useFormValidation from "../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";

const initialUserData = {
  firstName: "",
  lastName: "",
};

export default function UserDetails() {
  const navigate = useNavigate()
  const modalContext = useContext(ModalContextActions);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getAdditionalUserData,
    enabled: modalContext.isOpenUser,
  });

  const{ mutate, isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate} = useMutation({
    mutationFn: updateAdditionalUserData,
    onSuccess: () => {
        modalContext.hideUser();
    }
  })

  const {
    formData,
    setFormData,
    errors,
    handleChange,
    validateOnSubmit,
    scope,
  } = useFormValidation(initialUserData, 'userDetails');

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  }, [data]);

  if(isErrorUpdate){
    return <ErrorBlock title={errorUpdate.info} message={errorUpdate.message} status={errorUpdate.code}/>
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateOnSubmit()){
        console.log(formData);
        mutate(formData)
    } 
  }

  return (
    <AnimatePresence>
      {modalContext.isOpenUser && (
        <Modal open={modalContext.isOpenUser} onClose={modalContext.hideUser}>
          <div className={classes.userModal}>
            <h2>Your Details</h2>
            {isError ? (
              <ErrorBlock
                title={error.info}
                message={error.message}
                status={error.code}
              />
            ) : isLoading ? (
              <Loading message="Loading details..." />
            ) : (
              <form
                onSubmit={handleSubmit}
                className={classes.userForm}
                ref={scope}
              >
                <div>
                  <Input
                    label="First Name"
                    id="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    name="firstName"
                    className={errors.firstName ? 'errorInput' : ''}
                  />
                  {errors.firstName && <span className={classes.error}>{errors.firstName}</span>}

                  <Input
                    label="Last Name"
                    id="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    name="lastName"
                    className={errors.lastName ? 'errorInput' : ''}
                  />
                  {errors.lastName && <span className={classes.error}>{errors.lastName}</span>}

                </div>
                <div className={classes.userButtons}>
                  <Button
                    onClick={modalContext.hideUser}
                    textOnly
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isLoadingUpdate}>
                    {isLoadingUpdate? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
