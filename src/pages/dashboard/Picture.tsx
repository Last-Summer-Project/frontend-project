import Picturecom from "~/components/Picturecom";

import img from "~/assets/img/mascot.png";
import img2 from "~/assets/img/image.png";
import img3 from "~/assets/img/icon.png";

const Picture = () => {
  return (
    <main className="main-content position-relative border-radius-lg ">
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
        id="navbarBlur"
        data-scroll="false"
      >
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb"></nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          ></div>
        </div>
      </nav>

      <div style={{ height: "4rem" }}>
        <img
          src={img2}
          className="mainbode"
          style={{
            top: "-10px",
            display: "inline-block",
            position: "relative",
            margin: "0 0 -10px 1150px",
            height: "70px",
            zIndex: 1
          }}
        ></img>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6 className="w-10 test1" style={{ fontSize: 20 }}>
                  사진
                </h6>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <div className="album py-5 bg-light">
                      <div className="container">
                        <div className="table align-items-center justify-content-center mb-0">
                          <div>
                            <Picturecom name="6월 16일" />
                            <Picturecom name="6월 15일" />
                            <Picturecom name="6월 14일" />
                          </div>
                          <div>
                            <Picturecom name="6월 13일" />
                            <Picturecom name="6월 12일" />
                            <Picturecom name="6월 11일" />
                          </div>
                          <div>
                            <Picturecom name="6월 10일" />
                            <Picturecom name="6월 9일" />
                            <Picturecom name="6월 8일" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Picture;
