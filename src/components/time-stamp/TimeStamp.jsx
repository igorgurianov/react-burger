import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

const TimeStamp = ({ dateFromServer }) => {
  return (
    <span className="text text_type_main-default text_color_inactive">
      <FormattedDate date={new Date(dateFromServer)}></FormattedDate>
    </span>
  );
};

export default TimeStamp;
