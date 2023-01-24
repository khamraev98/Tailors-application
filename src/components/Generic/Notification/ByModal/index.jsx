import { Modal } from "antd";
const { confirm } = Modal;

const warning = ({
  title,
  content,
  onOk,
  okText,
  okButtonProps,
  showConfirm,
}) => {
  console.log("im workin...");
  confirm({
    title,
    content,
    onOk,
    okButtonProps,
    okText,
    open: showConfirm,
  });
};
export { warning };
