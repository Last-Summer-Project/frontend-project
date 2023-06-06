import "~/assets/scss/dashboard/matrixbox.scss";

interface MatrixBoxProps {
  title: string;
  content: string;
  imageUrl: string;
}

export default function MatrixBox({
  title,
  content,
  imageUrl,
}: MatrixBoxProps) {
  return (
    <div className="matrix-box">
      <div
        className="pic"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="text">
          <h3 className="omyu">{title}</h3>
          <p className="omyu">{content}</p>
        </div>
      </div>
    </div>
  );
}
