import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";

export default class App extends React.Component {
    state = {
        length: "",
        Password: "",
        btn: 0,
        copied: false,
    };

    Generate = () => {
        this.setState({
            Password: "",
            btn: 0,
            copied: false,
        });
        const str = "abcdefghijklmnopqrstuvwxyz";
        const symbol = `!@#$%^&*()_-+={}[]"'|,.<>/?~`;
        let password = "";
        const _this = this;
        for (let i = 0; i < this.state.length; i++) {
            (function (n) {
                setTimeout(function () {
                    switch (Math.floor(Math.random() * 4)) {
                        case 0: {
                            password += str.charAt(
                                Math.floor(Math.random() * str.length)
                            );
                            break;
                        }
                        case 1: {
                            password += str
                                .charAt(Math.floor(Math.random() * str.length))
                                .toUpperCase();
                            break;
                        }
                        case 2: {
                            password += symbol.charAt(
                                Math.floor(Math.random() * symbol.length)
                            );
                            break;
                        }
                        case 3: {
                            password += Math.floor(Math.random() * 10);
                            break;
                        }
                        default:
                            break;
                    }
                    _this.setState({ password, btn: i + 1 });
                }, 20 * n);
            })(i);
        }
    };

    Length = (e) => {
        this.setState({
            [e.target.name]: e.target.value.match(/\d+/g),
            btn: 0,
        });
    };
    render() {
        return (
            <div
                className=" py-5"
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0,.5)), url('./cool-background.png')`,
                }}
            >
                <MDBContainer>
                    <h1 className="display-3 text-center font-weight-bold text-danger mb-5">
                        Auto Password Generator
                    </h1>
                    <MDBRow>
                        <MDBCol sm="4" className="offset-3">
                            <MDBInput
                                label="Please Enter Password Length"
								className='text-light'
                                onChange={this.Length}
                                name="length"
                                value={this.state.length}
                                onKeyPress={(e) => {
                                    e.key === "Enter" && this.Generate();
                                }}
                            />
                        </MDBCol>
                        <MDBCol sm="5">
                            <MDBBtn
                                className="btn-primary text-white"
                                variant="outline-primary"
                                onClick={this.Generate}
                            >
                                Generate
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    {this.state.password && (
                        <MDBRow className="text-center my-5 font-weight-bold text-wrap text-break text-justify">
                            <MDBCol className="offset-">
                                {this.state.btn >= this.state.length && (
                                    <CopyToClipboard
                                        text={this.state.password}
                                        onCopy={() =>
                                            this.setState({ copied: true })
                                        }
                                    >
                                        <MDBBtn className="my-3 mr-3 btn btn-success">
                                            Copy to clipboard
                                        </MDBBtn>
                                    </CopyToClipboard>
                                )}
                                {this.state.copied ? (
                                    <span style={{ color: "tomato" }}>
                                        Copied.
                                    </span>
                                ) : null}
                                <p>
                                    <mark className="text-success bg-light px-3 pb-1">
                                        Password :{" "}
                                    </mark>
                                    <mark className="px-3 pb-1">
                                        {this.state.password}
                                    </mark>
                                </p>
                            </MDBCol>
                        </MDBRow>
                    )}
                </MDBContainer>
            </div>
        );
    }
}
