import React from "react";
import { Row, Container } from "reactstrap";
const StaticIp = (props) => {
    const { staticshow, staticIpBind, staticCost } = props
console.log(staticCost,"staticCost")
    return (
        <>
            {
                staticshow &&
                <Container fluid={true}>
                    {staticIpBind &&
                        <section className="m-4" >

                            <dl className="w-full">
                                <dt className="w-1/3">Static IP</dt>
                                <dd>{staticIpBind}</dd>
                                <dt className="w-1/3">Static IP Cost</dt>
                                <dd>{staticCost}</dd>
                            </dl>
                        </section>
                    }
                </Container>
            }

        </>
    )
}
export default StaticIp;