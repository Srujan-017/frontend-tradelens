import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        axios
            .get(
                "https://ec2-3-107-104-5.ap-southeast-2.compute.amazonaws.com:3002/currentUser",
                {
                    withCredentials: true,
                }
            )
            .then((res) => {

                if (res.data.success) {

                    setAuthenticated(true);

                } else {

                    window.location.href = "https://ec2-3-107-104-5.ap-southeast-2.compute.amazonaws.com:3002/login";

                }

                setLoading(false);

            })
            .catch(() => {

                window.location.href = "https://ec2-3-107-104-5.ap-southeast-2.compute.amazonaws.com:3002/login";

            });

    }, []);

    if (loading) {

        return <h3>Loading...</h3>;

    }

    return authenticated ? children : null;

};

export default ProtectedRoute;