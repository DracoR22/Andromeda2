import useLoginModal from "@/hooks/UseLoginModal"
import Modal from "./Modal"
import Login from "../auth/Login"

const LoginModal = () => {

    const loginModal = useLoginModal()

    const bodyContent = (
        <div>
           <Login/>
        </div>
      )

  return (
    <Modal
     isOpen={loginModal.isOpen} title='Login' actionLabel='Continue'
    onClose={loginModal.onClose}  body={bodyContent} onSubmit={() => {}}
    />
  )
}

export default LoginModal
