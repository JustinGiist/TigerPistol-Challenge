import "./ModalComponent.scss";
interface ModalComponentProps {
  children: any;
  closeFunction: () => void;
}
const ModalComponent = (props: ModalComponentProps) => {
  return (
    <div className="modal" onClick={props.closeFunction}>
      <div className="modalContent">{props.children}</div>
    </div>
  );
};
export default ModalComponent;
