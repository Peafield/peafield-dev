type ImageDescriptionProps = {
  description: string;
};

const ImageDescription = ({ description }: ImageDescriptionProps) => {
  return (
    <p className="absolute left-0 p-2 font-openSans md:bottom-0 md:text-2xl text-black md:bg-white dark:text-white dark:bg-black md:rounded-tr-lg">
      {description}
    </p>
  );
};

export default ImageDescription;
