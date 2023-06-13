import { Form } from "react-bootstrap";
import { DISABLED_HEAVY_SERVER_WORK } from "~/const/shared";
import { AnyFunction } from "~/types";

interface NewFormProp {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  setStartDate?: AnyFunction;
  setEndDate?: AnyFunction;
  min?: string | number;
  max: string | number;
}

const NewForm = ({
  onSubmit,
  setStartDate,
  setEndDate,
  min,
  max,
}: NewFormProp) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="makeVideo.startDate">
        <Form.Label>시작일</Form.Label>
        <Form.Control
          type="date"
          min={min}
          max={max}
          onChange={(event) => {
            setStartDate?.(event.target.value);
          }}
          defaultValue={min}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="makeVideo.endDate">
        <Form.Label>종료일</Form.Label>
        <Form.Control
          type="date"
          min={min}
          max={max}
          onChange={(event) => {
            setEndDate?.(event.target.value);
          }}
          defaultValue={max}
        />
      </Form.Group>

      <button
        type="submit"
        className="btn bg-gradient-info w-auto my-4 mb-2 omyu-important"
        disabled={DISABLED_HEAVY_SERVER_WORK}
        style={{
          fontSize: "15px",
          zIndex: 1,
          display: "block",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        제작 시작
      </button>
    </Form>
  );
};

export default NewForm;
