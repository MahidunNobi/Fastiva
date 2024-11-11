const Title = ({
  title1,
  title2,
  cusClass,
}: {
  title1: string;
  title2?: string;
  cusClass?: string;
}) => {
  return (
    <h2 className={`text-4xl font-semibold text-gray-600 my-6 ${cusClass}`}>
      {title1} <span className="text-primary">{title2} </span>
    </h2>
  );
};

export default Title;
