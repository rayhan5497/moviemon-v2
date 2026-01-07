const DetailsSection = ({ person }) => {
  const description = person?.biography;
  const birthDay = person?.birthday;
  const deathDay = person?.deathday;
  const birthPlace = person?.place_of_birth;

  return (
    <div className="details relative flex flex-col gap-1 font-light">
      <p
        className={`description leading-5 ${
          description ? 'opacity-80' : 'opacity-60'
        }`}
      >
        {description ? description : 'No Descripton !'}
      </p>
      <div className="birthday">
        <span className="title opacity-80">Born in: </span>
        <span className={`${birthDay ? 'opacity-100' : 'opacity-60'}`}>
          {birthDay ? birthDay : 'N/A'}
        </span>
      </div>
      {deathDay && (
        <div className="deathday">
          <span className="title opacity-80">Died in: </span>
          <span className={`${deathDay ? 'opacity-100' : 'opacity-60'}`}>
            {deathDay}
          </span>
        </div>
      )}
      <div className="birth-place">
        <span className="title opacity-80">Birth place: </span>
        <span className={`${birthPlace ? 'opacity-100' : 'opacity-60'}`}>
          {birthPlace ? birthPlace : 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default DetailsSection;
