'use client'

import { server } from "@/utils/server"
import axios from "axios"
import { useEffect, useState } from "react"


const ActivationPage = ({params}: {params: {activationId: string }}) => {

    const activation_token  = params.activationId
    const [expiredError, setExpiredError] = useState(false)

    useEffect(() => {
        if (params.activationId) {
            const activationEmail = async () => {
                try {
                    await axios.post(`${server}/user/activation`, { activation_token });
                } catch (error: any) {
                    if (error.response && error.response.status === 400) {
                        console.log(error.response.data.message);
                        setExpiredError(true);
                    } else {
                        // Handle other error cases
                        console.error("An error occurred:", error);
                    }
                }
            };
            activationEmail();
        }
    }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {expiredError ? (
        <p>Your token has expired</p>
      ) : (
        <p>Your account has been created succesfully</p>
      )}
    </div>
  )
}

export default ActivationPage
