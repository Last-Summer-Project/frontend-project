import MatrixBox from "~/components/MatrixBox";
import MatrixBoard from "~/components/MatrixBoard";
import CardHeader from "~/components/CardHeader";
import Card from "~/components/Card";

import makgoelli from "~/assets/img/pastinfo/Makgeolli.jpg";
import sugar from "~/assets/img/pastinfo/sugar.png";
import vegetable from "~/assets/img/pastinfo/vegetable.png";
import egg from "~/assets/img/pastinfo/egg.jpg";
import mark from "~/assets/img/mark.png";
import sick from "~/assets/img/sick.png";

export default function Sick() {
  const imageMatrixData = [
    {
      title: "막걸리",
      content:
        "막걸리와 설탕을 2대 1로 섞어 원액 제조 후, 원액(소주잔 1컵)에 2L 물을 섞어주세요!",
      imageUrl: makgoelli
    },
    {
      title: "설탕물",
      content:
        "우유에 백설탕 2스푼을 섞어 잘 녹인 후 해충이 있는 잎 뒷면에 뿌려주세요!",
      imageUrl: sugar
    },
    {
      title: "채소껍질",
      content:
        "요리하면서 나오는 채소 껍질 7, 흙을 3의 비율로 섞어 비료로 사용해보세요!",
      imageUrl: vegetable
    },
    {
      title: "달걀 껍질",
      content:
        "달걀 껍데기를 부수어 흙이랑 섞어주세요. 흙을 알칼리성으로 만들어요!",
      imageUrl: egg
    }
  ];

  const diseaseData = {
    상추균핵병: [
      "상추의 약한 부위를 통해 침입해요",
      "물러서 썩고 흰 균이 자라며, 감염 부위에는 균핵(덩어리)가 형성돼요",
      "습도가 높고 15~25℃의 서늘한 상태에서 발생하는 경우가 많아요"
    ],
    상추노균병: [
      "공기를 통해 전염되기 때문에 온·습도, 병원균 침입 차단이 중요해요",
      "잎 표면에 반점과 흰 균이 생기며, 아래 잎부터 발생해요",
      "병든 잎은 끝에서부터 갈색으로 변해요"
    ]
  };

  const sockData = [
    "-고품질의 농산물을 수확하기 위해서 필요한 과정!",
    "-생육환경을 양호하게 하는 솎아내기!",
    "-간격이 너무 좁으면, 잘 자라지 못하므로 아깝더라도 솎아주세요.",
    "-조심히 흙을 떠서 옮겨 심어주세요",
    "-질병이 난 작물을 제거하며 품질을 높여보세요.",
    "-상추의 경우 1차(잎 1~2매) 5cm, 2차(잎 3~4매) 10cm,",
    "3차(잎 5~6매) 20cm 간격으로 솎아주세요!"
  ];

  return (
    <>
      <main className="main-content position-relative border-radius-lg">
        <div style={{ height: "5rem" }}>
          <img
            src={sick}
            style={{ marginLeft: "1140px" }}
            className="navbar-brand-img h-100"
          />
        </div>

        <div style={{ height: "10rem", width: "1250px" }}>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card mb-4">
                  <div className="card-header pb-0">
                    <h6 className="w-10 test1" style={{ fontSize: 20 }}>
                      대시보드
                    </h6>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center justify-content-center mb-0"></table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row inner-top-md">
          <div className="container text-center">
            <div className="martix-txt">
              {/* 왼쪽 보드 */}
              <div
                className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
                style={{ marginLeft: "50px", width: "400px", height: "5px" }}
              >
                <Card style={{ width: "600px" }}>
                  <CardHeader additionalClassName="pb-0 p-3">
                    상추질병
                  </CardHeader>
                  <div
                    className="table-responsive"
                    style={{ height: "345px", width: "610px" }}
                  >
                    <table className="table align-items-center">
                      <tbody>
                        {Object.entries(diseaseData).map(([key, value]) => (
                          <tr key={key}>
                            <td className="w-10">
                              <h6
                                className="w-10 omyu"
                                style={{ fontSize: "20px" }}
                              >
                                {key}
                              </h6>
                            </td>
                            <td style={{ width: "100px" }}>
                              {value.map(item => (
                                <p
                                  key={item}
                                  className="w-10 omyu"
                                  style={{ fontSize: "20px" }}
                                >
                                  {item}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                <div style={{ height: "4rem" }}></div>
                <div
                  className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
                  style={{ width: "400px", height: "5px" }}
                >
                  <Card style={{ width: "600px" }}>
                    <CardHeader additionalClassName="pb-0 p-3">
                      솎아내기
                    </CardHeader>
                    <div
                      className="table-responsive"
                      style={{ height: "372px", width: "600px" }}
                    >
                      <table className="table align-items-center">
                        <tbody>
                          <tr>
                            <td style={{ width: "100px" }}>
                              {sockData.map(item => (
                                <p
                                  key={item}
                                  className="w-10 omyu"
                                  style={{ fontSize: "20px" }}
                                >
                                  {item}
                                </p>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                  <div
                    className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
                    style={{
                      marginTop: "-920px",
                      marginLeft: "700px",
                      width: "400px",
                      height: "100px"
                    }}
                  >
                    <Card style={{ width: "430px", height: "530px" }}>
                      <CardHeader additionalClassName="pb-1 p-3">
                        가정에서 할수있는 천연방제법
                      </CardHeader>
                      <MatrixBoard>
                        {imageMatrixData.map(({ title, content, imageUrl }) => (
                          <MatrixBox
                            key={title}
                            title={title}
                            content={content}
                            imageUrl={imageUrl}
                          />
                        ))}
                        <img src={mark} style={{ marginLeft: "250px" }} />
                      </MatrixBoard>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
