import OurTeamSwiper from "./OurTeamSwiper";

const OurTeam = () => {
  return (
    <div
      className="xs:w-[85%] md:w-[80%] flex flex-col items-center gap-6 xs:mt-16 lg:mt-28 section"
      id="team">
      <h1 className="text-custom-yellow xs:text-3xl lg:text-4xl font-bold">
        Our Team
      </h1>
      <p className="xs:text-justify lg:text-center font-medium xs:w-full lg:w-[90%]">
        Meet the team
      </p>
      <OurTeamSwiper />
    </div>
  );
};

export default OurTeam;
