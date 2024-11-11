const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <h4 className="text-lg roboto font-semibold my-6 text-gray-500">
      {subtitle}
    </h4>
  );
};

export default Subtitle;
