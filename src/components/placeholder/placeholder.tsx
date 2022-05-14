
interface IPlaceholderProps {
  text: string;
}

export const Placeholder = (props: IPlaceholderProps) => {
  const { text } = props;
  return <h3 className="placeholder">{text}</h3>
}