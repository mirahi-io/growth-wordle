type Props = {
  title: string;
};

export const Header = (props: Props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};
