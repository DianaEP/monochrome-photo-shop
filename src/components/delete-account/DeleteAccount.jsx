import { useContext } from "react";
import classes from "./DeleteAccount.module.css";
import ModalContextActions from "../../store/ModalContextActions";
import Button from "../../UI/button/Button";
import { AnimatePresence } from "framer-motion";
import Modal from "../../UI/modal/Modal";
import { BiSolidError } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../util/http";
import { useNavigate } from "react-router-dom";
import ErrorBlock from "../error-block/ErrorBlock";

export default function DeleteAccount() {
  const navigate = useNavigate()
  const modalContext = useContext(ModalContextActions);
  const{mutate, isLoading, isError, error} = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
        modalContext.hideDelete();
        navigate('/auth');
    }
  })

  function handleDeleteAccount(){
    mutate();
  }
  return (
    <AnimatePresence>
      {modalContext.isOpenDeleteAccount && (
        <Modal open={modalContext.isOpenDeleteAccount} onClose={modalContext.hideDelete}>
           {isError ? (
            <ErrorBlock title={error.info} message={error.message} status={error.code}/>
           ) : (
            <div className={classes.deleteModal}>
                <div className={classes.attentionIcon}><BiSolidError /></div>
                <h3>Confirm Account Deletion</h3>
                <div className={classes.text}>
                    <p>Are you sure you want to delete your account?</p>
                    <p> This action cannot be undone.</p>
                </div>
                <div className={classes.deleteButtons}>
                <Button textOnly onClick={modalContext.hideDelete}>
                    Cancel
                </Button>
                <Button onClick={handleDeleteAccount} disabled={isLoading}>{isLoading ? "Deleting..." : "Delete"}</Button>
                </div>
            </div>

           )} 
        </Modal>
      )}
    </AnimatePresence>
  );
}
