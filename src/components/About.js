import React from "react";
import Hao from "../img/Hao.png";
import Quang from "../img/Quang.jpg";
import Tuan from "../img/Tuan.png";
import Hai from "../img/Hai.jpg";
import Dat from "../img/Dat.jpg";

const About = () => {
    return (
        <div>
            <div className="page-header">
                <div className="page-header-overlay">
                    <div className="page-header-body">
                        <h1>About Us</h1>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="page-body">
                        <div className="white-bg">
                            <div className="personal-info">
                                <div className="avatar-about">
                                    <img src={Hao} alt="Hao's avatar"></img>
                                </div>
                                <div className="personal-desc">
                                    <p>
                                        Name: Nguyen Tan Song Hao <br />
                                        Date of birth: 08-05-1997 <br />
                                        Minor: Mobile and Web Development <br />
                                        Contribution: Back End Developer <br />{" "}
                                        <br />
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged.
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="personal-info">
                                <div className="avatar-about">
                                    <img src={Quang} alt="Quang's avatar"></img>
                                </div>
                                <div className="personal-desc">
                                    <p>
                                        Name: Nguyen Vinh Quang <br />
                                        Date of birth: 23-06-2000 <br />
                                        Minor: Artificial Intelligence <br />
                                        Contribution: Front End Developer <br />{" "}
                                        <br />
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged.
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="personal-info">
                                <div className="avatar-about">
                                    <img src={Tuan} alt="Tuan's avatar"></img>
                                </div>
                                <div className="personal-desc">
                                    <p>
                                        Name: Nguyen Anh Tuan <br />
                                        Date of birth: 25-11-2001 <br />
                                        Minor: Cloud Technologies <br />
                                        Contribution: Front End Developer <br />{" "}
                                        <br />
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged.
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="personal-info">
                                <div className="avatar-about">
                                    <img src={Hai} alt="Hai's avatar"></img>
                                </div>
                                <div className="personal-desc">
                                    <p>
                                        Name: Hoang Truc Hai <br />
                                        Date of birth: 19-03-2001
                                        <br />
                                        Minor: Mobile and Web Development <br />
                                        Contribution: Back End Developer <br />{" "}
                                        <br />
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged.
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="personal-info">
                                <div className="avatar-about">
                                    <img src={Dat} alt="Dat's avatar"></img>
                                </div>
                                <div className="personal-desc">
                                    <p>
                                        Name: Ngo Van Dat <br />
                                        Date of birth: 22-11-2000
                                        <br />
                                        Minor: Mobile and Web Development <br />
                                        Contribution: Back End Developer <br />{" "}
                                        <br />
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
