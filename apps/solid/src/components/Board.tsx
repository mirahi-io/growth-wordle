type Props = {
  wordOfTheDay: string;
};

export const Board = (props: Props) => {
  return <div>{props.wordOfTheDay}</div>;
};
