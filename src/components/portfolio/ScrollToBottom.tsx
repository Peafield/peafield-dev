import { RiScrollToBottomFill } from "react-icons/ri";

const ScrollToBottom = () => {
  return (
    <div className="absolute bottom-16 left-0 right-0 flex justify-center animate-bounce">
      <RiScrollToBottomFill className="size-12" />
    </div>
  );
};
export default ScrollToBottom;
