import HeadingDetailsSection from '../../components/sections/HeadingDetails';

const HeadingSection = ({ media }) => {
  const name = media?.name || media.title;

  return (
    <div className="heading-container gap-1 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold">{name ? name : 'N/A'}</h2>
      <HeadingDetailsSection media={media} />
    </div>
  );
};

export default HeadingSection;
