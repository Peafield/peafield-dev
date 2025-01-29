type ImageDescriptionProps = {
  description: string;
};

const ImageDescription = ({ description }: ImageDescriptionProps) => {
  return (
    <p className="absolute bottom-0 left-0 p-2 text-black bg-white dark:text-white dark:bg-black rounded-tr-lg">
      {" "}
      {description}
    </p>
  );
};

export default ImageDescription;
