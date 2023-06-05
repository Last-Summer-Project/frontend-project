import Picturecom from "~/components/Picturecom";

import img2 from "~/assets/img/image.png";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { detectedPerDay } from "~/app/slices/log";
import { IMAGE_HOST } from "~/const/url";

const Picture = () => {
  const { logs } = useAppSelector(state => state.log);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(detectedPerDay());
  }, [dispatch]);

  const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_: any, i: number) =>
      arr.slice(i * size, i * size + size)
    );

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
                <h6 className="w-10 omyu" style={{ fontSize: 20 }}>
                  사진
                </h6>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <div className="album py-5 bg-light">
                      <div className="container">
                        <div className="table align-items-center justify-content-center mb-0">
                          {chunk(logs ?? [], 3).map((ls: LogResponseRaw[]) => (
                            <div>
                              {ls.map(l => {
                                const d = new Date(l.timestamp);
                                const n = `${d.getMonth() + 1}월 ${d.getDate()}일`;
                                return (
                                  <Picturecom
                                    name={n}
                                    img={IMAGE_HOST + l.imageUrl}
                                  />
                                );
                              })}
                            </div>
                          ))}
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
