import React from "react";

interface Props {
  name: string;
  img?: string;
}

function Picturecom(props: Props) {
  const img = props.img ? (
    <img src={props.img} width="500px" height="500px" />
  ) : (
    <svg
      className="bd-placeholder-img card-img-top"
      width="100"
      height="225"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: Thumbnail"
    >
      <title>Placeholder</title>
      <rect width="500" height="500" fill="#55595c"></rect>
      <text
        x="30"
        y="50"
        fill="#eceeef"
        dy=".3em"
        /*className="w-10 omyu"*/
        style={{ fontSize: 20 }}
      >
        해당 일자 마지막 사진
      </text>
    </svg>
  );

  return (
    <div className="col-md-4" style={{ float: "left" }}>
      <div className="card mb-4 shadow-sm">
        {img}
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted omyu" style={{ fontSize: 20 }}>
              {props.name}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Picturecom;
